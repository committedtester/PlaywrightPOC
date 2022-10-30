/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	use: {
		browserName: "chromium",
		headless: false,
		viewport: { width: 1280, height: 720 },
		ignoreHTTPSErrors: true,
		video: "on-first-retry"
	},
	timeout: 30000,
	reporter: [
		["html", { outputFolder: "./testOutput/reports/" }],
		["junit", { outputFile: "./testOutput/junit/junit.xml" }]
	]
};

module.exports = config;
