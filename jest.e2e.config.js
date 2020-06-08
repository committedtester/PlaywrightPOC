module.exports = {
	globals: {
		"ts-jest": {
			tsConfig: "tsconfig.json"
		}
	},
	moduleFileExtensions: ["ts", "js"],
	preset: "jest-playwright-preset",
	testMatch: ["**/tests/**/*.test.(ts|js)"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	testPathIgnorePatterns: ["/node_modules/", "dist"],
	setupFilesAfterEnv: ["./jest.setup.js"],
	reporters: [
		"default",
		[
			"jest-junit",
			{
				suiteName: "PlaywrightTests",
				outputDirectory: "./junit/",
				outputName: "./junit.xml",
				usePathForSuiteName: "true",
				includeConsoleOutput: "true"
			}
		],
		[
			"jest-html-reporters",
			{
				publicPath: "./reports/",
				filename: "report.html",
				expand: true
			}
		]
	]
};
