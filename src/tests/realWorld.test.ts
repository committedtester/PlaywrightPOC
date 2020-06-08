const { saveVideo } = require("playwright-video");
import * as initializer from "./../testSetup/initializer";

describe("TodoMVC No Page Object POC ", () => {
	let browser: any;
	let page: any;
	let capture: any;
	beforeAll(async () => {
		browser = await initializer.defaultBeforeAll();
	});
	afterAll(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		page = await initializer.defaultBeforeEach(browser);
	});
	afterEach(async () => {
		await capture.stop();
		await page.close();
	});

	let testId001 = "T001";
	it(`${testId001}Load Realworld`, async () => {
		await page.goto("https://react-redux.realworld.io/");
		capture = await saveVideo(page, `./videos/${testId001}.mp4`);
		expect(await page.title()).toBe("Conduit");
	});

	let testId002 = "T002";
	it(`${testId002}Goto Signin`, async () => {
		await page.goto("https://react-redux.realworld.io/");
		capture = await saveVideo(page, `./videos/${testId002}.mp4`);
		await page.click(".nav-link[href='#login']");
		await page.click("input[type='email']");
	});
});
