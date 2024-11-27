import { auth, db } from '../../lib/firebase'; // Your firebase.js configuration
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { email, password, user_name, user_surname } = req.body;

	if (!email || !password || !user_name || !user_surname) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		// Create the user in Firebase Auth
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;

		// Add user details to Firestore
		await setDoc(doc(db, 'Users', user.uid), {
			user_name,
			user_surname,
			email,
			createdAt: Timestamp.fromDate(new Date()),
		});

		res.status(201).json({
			message: 'User registered and saved to Firestore successfully!',
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
