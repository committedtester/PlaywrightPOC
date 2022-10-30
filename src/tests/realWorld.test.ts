import { test, expect } from "@playwright/test";
import { Page, Browser} from "playwright";
import { getBrowser } from "../testSetup/testInitializer";

test.describe("TodoMVC No Page Object POC ", () => {
	let browser: Browser;
	let page: Page;

	test.beforeAll(async () => {
		browser = await getBrowser();
		page = await browser.newPage();
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
