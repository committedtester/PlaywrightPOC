import { chromium } from "playwright";
let browser;
let page;

describe("TodoMVC POC ", () => {
	beforeAll(async () => {
		browser = await chromium.launch();
	});
	afterAll(async () => {
		await browser.close();
	});
	beforeEach(async () => {
		page = await browser.newPage();
	});
	afterEach(async () => {
		await page.close();
	});
	it("Basic Navigation", async () => {
		await page.goto("http://todomvc.com/");
		expect(await page.title()).toBe("TodoMVC");
	});
});
