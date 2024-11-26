import React, { useEffect, useState } from 'react';

const UserList = () => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch(`/api/get-data`);
				if (!response.ok) {
					throw new Error('Failed to fetch user data');
				}
				const res = await response.json();
				setRows(res.data); // Assuming the API returns { data: [...] }
			} catch (error) {
				console.error('Error fetching user data:', error);
				setRows([]);
			}
		};

		fetchUsers();

		return () => {
			setRows([]); // Clean up state on component unmount
		};
	}, []);

	return (
		<div>
			<h1>User List</h1>
			{rows?.length > 0 ? (
				<table>
					<thead>
						<tr>
							<th>User Name</th>
							<th>User Surname</th>
							<th>User Phone</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((user, index) => (
							<tr key={index}>
								<td>{user.user_name}</td>
								<td>{user.user_surname}</td>
								<td>{user.user_phone}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No user data available.</p>
			)}
		</div>
	);
};

export default UserList;
