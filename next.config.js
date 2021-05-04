const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
	pwa: {
		dest: "public",
		runtimeCaching
	},
	env: { backendURL: "https://gb-be.de" },
	future: { webpack5: true }
});
