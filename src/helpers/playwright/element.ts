import { testObject } from "../../testSetup/testObject";

export const click = async (testObject: testObject, selector: any, options?: any) => {
	await testObject.page.click(selector, options);
	testObject.logger.info(`Clicked on ${selector}`);
};

export const type = async (testObject: testObject, selector: any, text: string, options?: any) => {
	await testObject.page.type(selector, text, options);
	testObject.logger.info(`Typed ${text} on ${selector}`);
};

export const waitForSelector = async (testObject: testObject, selector: any, options?: any) => {
	await testObject.page.waitForSelector(selector, options);
	testObject.logger.info(`Waited Successfully for ${selector}`);
};

export const getInnerText = async (testObject: testObject, selector: any): Promise<any> => {
	let element = await testObject.page.$(selector);
	let elementText = element?.innerText();
	if (elementText == undefined || elementText == null) {
		fail(`Inner Text not identified for ${selector}`);
	}
	testObject.logger.info(`Inner Text of ${elementText} identified for ${selector}`);
	return elementText;
};
