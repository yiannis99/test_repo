import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function insertData(data) {
	try {
		const docRef = await addDoc(collection(db, 'your-collection-name'), data);
		console.log('Document written with ID: ', docRef.id);
		return docRef.id;
	} catch (e) {
		console.error('Error adding document: ', e);
		throw e;
	}
}

export async function getData() {
	try {
		const q = query(collection(db, 'Users')); // Add conditions with `where` if needed
		const querySnapshot = await getDocs(q);

		const data = [];
		querySnapshot.forEach((doc) => {
			data.push({ id: doc.id, ...doc.data() });
		});

		return data;
	} catch (e) {
		console.error('Error fetching documents: ', e);
		throw e;
	}
}
