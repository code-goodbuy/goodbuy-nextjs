module.exports = {
	purge: {
		content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
		options: { safelist: ["dark"] }
	},
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				"red-crayola": "#ef3054",
				"tufts-blue": "#0197f6"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
