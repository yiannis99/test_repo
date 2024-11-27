import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.SECRET_KEY_ENCRYPT;

export function encrypt(text) {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(
		'aes-256-cbc',
		Buffer.from(ENCRYPTION_KEY, 'hex'),
		iv
	);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(encryptedText) {
	let parts = encryptedText.split(':');
	let iv = Buffer.from(parts.shift(), 'hex');
	let encrypted = Buffer.from(parts.join(':'), 'hex');
	let decipher = crypto.createDecipheriv(
		'aes-256-cbc',
		Buffer.from(ENCRYPTION_KEY, 'hex'),
		iv
	);
	let decrypted = decipher.update(encrypted);
	decrypted = Buffer.concat([decrypted, decipher.final()]);
	return decrypted.toString();
}
