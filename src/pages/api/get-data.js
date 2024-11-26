import { getData } from '@/repository/user-reositroy';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		try {
			const data = await getData();
			res.status(200).json({ data: data });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
