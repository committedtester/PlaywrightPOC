import { testObject } from "../../testSetup/testObject";
export const goto = async (testObject: testObject, url: string) => {
	await testObject.page.goto(url);
	testObject.logger.info(`Navigated to ${url}`);
};
