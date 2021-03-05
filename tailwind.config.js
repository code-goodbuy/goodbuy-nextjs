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
				"5": "5vh",
				"1/4": "25vh",
				"1/2": "50vh",
				"3/4": "75vh",
				"90": "90vh",
				"95": "95vh",
				"full": "100vh"
			},
			maxWidth: {
				"1/4": "25vw",
				"1/2": "50vw",
				"3/4": "75vw",
				"full": "100vw"
			},
			width: {
				"25": "25vw",
				"50": "50vw",
				"75": "75vw",
				"100": "100vh"
			},
			height: {
				"5": "5vh",
				"10": "10vh"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
