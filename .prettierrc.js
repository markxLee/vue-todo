module.exports = {
	printWidth: 80,
	useTabs: true,
	tabWidth: 2,
	semi: true,
	singleQuote: true,
	trailingComma: 'all',
	bracketSpacing: true,
	jsxBracketSameLine: false,
	importOrder: [
		'^(react/(.*)$)|^(react$)', // Imports by "react"
		'^(next/(.*)$)|^(next$)', // Imports by "next"
		'<THIRD_PARTY_MODULES>',
		'next-seo.config',
		'^@components/(.*)$',
		'^@fontsource/(.*)$',
		'^[./]', // Other imports
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
};
