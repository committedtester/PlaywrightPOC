import { saveVideo } from "playwright-video";
import * as logging from "../helpers/utility/logging";
import { Page } from "playwright";
import { Logger } from "log4js";

export class testObject {
	page: Page;
	capture: any;
	testName: string;
	logger: Logger;
	constructor(page, capture, testName, logger) {
		this.page = page;
		this.capture = capture;
		this.testName = testName;
		this.logger = logger;
	}

	stopRecording = async () => {
		await this.capture.stop();
	};
}

export const createTestObject = async (page, testName) => {
	let capture = await saveVideo(page, `./testOutput/videos/${testName}.mp4`);
	let logger = logging.createLogger(testName);
	let customTestObject = new testObject(page, capture, testName, logger);
	return customTestObject;
};
