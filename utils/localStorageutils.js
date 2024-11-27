export const saveToLocalStorage = (key, data) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(data));
	}
};

export const getFromLocalStorage = (key, defaultValue = {}) => {
	if (typeof window !== 'undefined') {
		const storedData = localStorage.getItem(key);
		return storedData ? JSON.parse(storedData) : defaultValue;
	}
	return defaultValue;
};

export const clearLocalStorage = (key) => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(key);
	}
};
