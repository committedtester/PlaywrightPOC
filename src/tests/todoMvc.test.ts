import playwright from "playwright";
const { saveVideo } = require("playwright-video");

describe("TodoMVC POC ", () => {
	let browser: any;
	let page: any;
	let context: any;
	let capture: any;
	beforeAll(async () => {
		browser = await playwright.chromium.launch({ headless: true });
	});
	afterAll(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		context = await browser.newContext();
		page = await context.newPage();
	});
	afterEach(async () => {
		await capture.stop();
		await page.close();
	});

	let testId001 = "001";
	it.only(`${testId001}Basic Navigation to realworld`, async () => {
		await page.goto("https://react-redux.realworld.io/");
		capture = await saveVideo(page, `./videos/${testId001}.mp4`);
		expect(await page.title()).toBe("Conduit");
		await page.click(".nav-link[href='#login']");
		await page.click("input[type='email']");
	});

	let testId002 = "002";
	it(`${testId002}Basic Navigation to todomvc`, async () => {
		await page.goto("http://todomvc.com//");
		capture = await saveVideo(page, `./videos/${testId002}.mp4`);
		expect(await page.title()).toBe("TodoMVC");
		await page.click("a[data-source='http://polymer-project.org']");
		expect(await page.title()).toBe("Polymer • TodoMVC");
	});
});
