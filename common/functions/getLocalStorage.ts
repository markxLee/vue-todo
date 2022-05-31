export const getLocalStorage = (key: string) => {
	const value =
		typeof localStorage === 'object'
			? JSON.parse(localStorage.getItem(key)!)
			: null;
	return value;
};
