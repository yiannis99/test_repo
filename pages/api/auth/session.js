import { setLoginSession } from '../../lib/auth';
import { verifyIdToken } from '../../lib/firebase-admin';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const { idToken } = req.body;
			const decodedToken = await verifyIdToken(idToken);

			await setLoginSession(res, {
				uid: decodedToken.uid,
				email: decodedToken.email,
			});

			res.status(200).json({ message: 'Session created successfully' });
		} catch (error) {
			res.status(401).json({ error: 'Invalid token' });
		}
	} else {
		res.status(405).end('Method Not Allowed');
	}
}
