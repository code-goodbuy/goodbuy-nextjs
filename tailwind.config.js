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
			maxHeight: {
				"90": "90vh"
			},
			width: {
				"25": "25vw",
				"30": "30vw",
				"50": "50vw",
				"50%": "50%",
				"75": "75vw",
				"90": "90vw",
				"100": "100vw"
			},
			height: {
				"5": "5vh",
				"10": "10vh",
				"90": "90vh",
				"95": "95vh"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require("@tailwindcss/forms")]
};
