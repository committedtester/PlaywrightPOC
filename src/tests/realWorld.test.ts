import { test, expect } from "@playwright/test";
import * as initializer from "./../testSetup/initializer";
import { Page, Browser, BrowserContext } from "playwright";

test.describe("TodoMVC No Page Object POC ", () => {
	let browser: Browser;
	let context: BrowserContext;
	let page: Page;
	let capture;
	test.beforeAll(async () => {
		browser = await initializer.defaultBeforeAll();
	});
	test.afterAll(async () => {
		await browser.close();
	});

	test.beforeEach(async () => {
		context = await initializer.createNewContext(browser);
		page = await context.newPage();
	});
	test.afterEach(async () => {
		await page.close();
	});

	let testId001 = "T001";
	test(`${testId001}Load Realworld`, async () => {
		await page.goto("https://react-redux.realworld.io/");
		expect(await page.title()).toBe("Conduit");
	});

	let testId002 = "T002";
	test(`${testId002}Goto Signin`, async () => {
		await page.goto("https://react-redux.realworld.io/");
		await page.click(".nav-link[href='#login']");
		await page.click("input[type='email']");
	});
});
