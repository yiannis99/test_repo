const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import crypto from 'crypto';
const hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const hashID = async (idNumber) => {
	return crypto.createHash('sha256').update(idNumber).digest('hex');
};

const verifyPassword = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};

const verifyIDNumber = async (idNumber, hashedIDNumber) => {
	return await bcrypt.compare(idNumber, hashedIDNumber);
};

const generateToken = (userId) => {
	return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
	return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
	hashPassword,
	verifyPassword,
	generateToken,
	verifyToken,
	hashID,
	verifyIDNumber,
};
