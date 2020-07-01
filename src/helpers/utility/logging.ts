import log4js from "log4js";

log4js.configure({
	appenders: {
		tests: { type: "multiFile", base: "testOutput/logs/", property: "categoryName", extension: ".log" }
	},
	categories: {
		default: { appenders: ["tests"], level: "debug" }
	}
});

export const createLogger = (testName): log4js.Logger => {
	return log4js.getLogger(testName);
};
