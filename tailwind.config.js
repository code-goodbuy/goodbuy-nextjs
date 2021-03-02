module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"red-crayola": "#ef3054",
				"tufts-blue": "#0197f6"
			}
		}
	},
	variants: {
		extend: { backgroundColor: ["dark"], textColor: ["dark"] }
	},
	plugins: []
};
