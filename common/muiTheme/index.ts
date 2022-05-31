import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		primary: {
			main: '#0057fc',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	spacing: 4,
});

export default theme;
