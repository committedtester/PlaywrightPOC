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
	setupFilesAfterEnv: ["./jest.setup.js"]
};
