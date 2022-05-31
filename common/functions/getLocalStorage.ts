export const getLocalStorage = (key: string) => {
	const value =
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem(key)!)
			: null;
	return value;
};
