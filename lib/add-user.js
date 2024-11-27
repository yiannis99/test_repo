import { db } from './firebase'; // Import Firebase config
import { doc, setDoc, Timestamp } from 'firebase/firestore';

// Function to add or update user details in Firestore
export const addUser = async (userId, userDetails) => {
	try {
		// Reference to the user document using userId
		const userRef = doc(db, 'users', userId);

		// Set user details in Firestore
		await setDoc(userRef, {
			firstName: userDetails.firstName,
			lastName: userDetails.lastName,
			email: userDetails.email,
			phoneNumber: userDetails.phoneNumber,
			dateOfBirth: userDetails.dateOfBirth,
			address: userDetails.address,
			profilePictureUrl: userDetails.profilePictureUrl || null,
			createdAt: Timestamp.fromDate(new Date()),
			updatedAt: Timestamp.fromDate(new Date()),
			status: userDetails.status || 'active', // Default status is 'active'
			role: userDetails.role || 'user', // Default role is 'user'
			preferences: userDetails.preferences || {
				language: 'en',
				notificationsEnabled: true,
			},
			lastLogin: Timestamp.fromDate(new Date()),
		});

		console.log('User added/updated successfully!');
	} catch (error) {
		console.error('Error adding/updating user: ', error);
	}
};
