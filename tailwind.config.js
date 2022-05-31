module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./view/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: {
					DEFAULT: '15px',
					sm: '10px',
					md: '15px',
				},
			},
			colors: {
				primary: {
					DEFAULT: '#0057fc',
					light: '#6b83ff',
					dark: '#002fc8',
				},
			},
			minWidth: {},
			minHeight: {
				500: '500px',
			},
		},
	},
	plugins: [],
};
