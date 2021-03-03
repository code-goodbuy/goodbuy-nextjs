module.exports = {
	purge: {
		content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
		options: { safelist: ["dark"] }
	},
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"primary": "#0197f6",
				"secondary": "#ef3054"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
