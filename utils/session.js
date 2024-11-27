import { serialize, parse } from 'cookie';
import { sign, verify } from 'jsonwebtoken';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60;

export const setTokenCookie = (res, token) => {
	const cookie = serialize(TOKEN_NAME, token, {
		maxAge: MAX_AGE,
		expires: new Date(Date.now() + MAX_AGE * 1000),
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		sameSite: 'lax',
	});
	res.setHeader('Set-Cookie', cookie);
};

export const removeTokenCookie = (res) => {
	const cookie = serialize(TOKEN_NAME, '', {
		maxAge: -1,
		path: '/',
	});
	res.setHeader('Set-Cookie', cookie);
};

export const parseCookies = (req) => {
	if (req.cookies) return req.cookies;
	const cookie = req.headers?.cookie;
	return parse(cookie || '');
};

export const getTokenCookie = (req) => {
	const cookies = parseCookies(req);
	return cookies[TOKEN_NAME];
};

export const setLoginSession = async (res, session) => {
	const token = sign(session, process.env.JWT_SECRET, {
		expiresIn: MAX_AGE,
	});
	setTokenCookie(res, token);
};

export const getLoginSession = (req) => {
	const token = getTokenCookie(req);
	if (!token) return;

	try {
		const session = verify(token, process.env.JWT_SECRET);
		return session;
	} catch (error) {
		return null;
	}
};
