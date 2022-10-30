import * as logging from "../helpers/utility/logging";
import { Page } from "playwright";
import { Logger } from "log4js";

export class testObject {
	page: Page;
	testName: string;
	logger: Logger;
	constructor(page, testName, logger) {
		this.page = page;
		this.testName = testName;
		this.logger = logger;
	}
}

export const createTestObject = async (page, testName) => {
	let logger = logging.createLogger(testName);
	let customTestObject = new testObject(page, testName, logger);
	return customTestObject;
};
