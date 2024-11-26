import { insertData } from '../../repository/user-reositroy';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		try {
			const id = await insertData(req.body);
			res.status(200).json({ id });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	} else {
		res.status(405).json({ message: 'Method not allowed' });
	}
}
