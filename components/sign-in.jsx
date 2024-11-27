import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import 'animate.css';
const SignInForm = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
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

		const { email, password } = formData;

		try {
			// Sign in the user with Firebase Authentication
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const idToken = await userCredential.user.getIdToken();

			// Send session creation request to API
			const response = await fetch('/api/auth/session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ idToken }),
			});

			if (!response.ok) {
				throw new Error('Failed to create session.');
			}

			// Redirect to the user page
			router.push('/user');
		} catch (error) {
			setMessage(`Error: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='m-auto flex justify-center max-w-7xl items-center'>
			<h2 className='animate__fadeInTopLeft'>Sign In</h2>
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

				<button
					type='submit'
					disabled={loading}
				>
					{loading ? 'Signing in...' : 'Sign In'}
				</button>
			</form>

			{message && <p>{message}</p>}
		</div>
	);
};

export default SignInForm;
