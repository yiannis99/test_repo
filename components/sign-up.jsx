import React, { useState } from 'react';
import { useRouter } from 'next/router';

const RegisterUserForm = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		user_name: '',
		user_surname: '',
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const router = useRouter();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage('');

		try {
			const response = await fetch('/api/register-user', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || 'Something went wrong');
			}

			setMessage('Registration successful! Redirecting to sign-in...');
			setTimeout(() => {
				router.push('/sign-in');
			}, 2000);
		} catch (error) {
			setMessage(`Error: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<h2>Register User</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label htmlFor='password'>Password:</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label htmlFor='user_name'>First Name:</label>
					<input
						type='text'
						id='user_name'
						name='user_name'
						value={formData.user_name}
						onChange={handleInputChange}
						required
					/>
				</div>

				<div>
					<label htmlFor='user_surname'>Last Name:</label>
					<input
						type='text'
						id='user_surname'
						name='user_surname'
						value={formData.user_surname}
						onChange={handleInputChange}
						required
					/>
				</div>

				<button
					type='submit'
					disabled={loading}
				>
					{loading ? 'Registering...' : 'Register'}
				</button>
			</form>

			{message && <p>{message}</p>}
		</div>
	);
};

export default RegisterUserForm;
