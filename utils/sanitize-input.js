import sanitizeHtml from 'sanitize-html';

export const sanitizeInput = (input) => {
	if (typeof input === 'string') {
		return sanitizeHtml(input, {
			allowedTags: [],
			allowedAttributes: {},
		});
	} else if (Array.isArray(input)) {
		return input.map((item) => sanitizeInput(item));
	} else if (typeof input === 'object' && input !== null) {
		return Object.keys(input).reduce((acc, key) => {
			acc[key] = sanitizeInput(input[key]);
			return acc;
		}, {});
	}
	return input;
};
