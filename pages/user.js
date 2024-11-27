import React from 'react';
import { getLoginSession } from '../utils/session';
import { getUserData } from '../lib/firebase-admin';

const UserPage = ({ user }) => {
	return (
		<div>
			<h1>Welcome, {user.user_name}!</h1>
			<p>First Name: {user.user_name}</p>
			<p>Last Name: {user.user_surname}</p>
			<p>Phone: {user.user_phone || 'Not provided'}</p>
		</div>
	);
};

export async function getServerSideProps({ req }) {
	const session = getLoginSession(req);

	if (!session) {
		return {
			redirect: {
				destination: '/sign-in',
				permanent: false,
			},
		};
	}

	const user = await getUserData(session.uid);

	return {
		props: { user },
	};
}

export default UserPage;
