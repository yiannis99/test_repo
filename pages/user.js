import React from 'react';

const UserPage = ({ user }) => {
	return <div></div>;
};

// export async function getServerSideProps({ req }) {
// 	const session = getLoginSession(req);

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/sign-in',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	const user = await getUserData(session.uid);

// 	return {
// 		props: { user },
// 	};
// }

export default UserPage;
