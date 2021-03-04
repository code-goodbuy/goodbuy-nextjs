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
			},
			minHeight: {
				"0": "0",
				"1/4": "25vh",
				"1/2": "50vh",
				"3/4": "75vh",
				"full": "100vh"
			},
			maxWidth: {
				"1/4": "25vh",
				"1/2": "50vh",
				"3/4": "75vh",
				"full": "100vw"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
