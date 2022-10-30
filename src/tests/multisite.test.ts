import { test, expect } from "@playwright/test";
import * as initializer from "../testSetup/initializer";
import { HomePage } from "../pageObjects/todoMvc/homePage";
import * as testObjectClass from "../testSetup/testObject";
import { Page, Browser, BrowserContext } from "playwright";

test.describe("MultiSite Testing ", () => {
	let browser: Browser;
	let page: Page;
	let context: BrowserContext;
	let testObject: testObjectClass.testObject;

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

	let testId005 = "T005";
	test(`${testId005}Navigation and Creation of single todo`, async () => {
		testObject = await testObjectClass.createTestObject(page, testId005);
		let homePage = new HomePage(testObject);
		await homePage.GotoTodosURL();
		expect(await page.title()).toBe("TodoMVC");
		let todosPage = await homePage.ClickPolymerLink();
		expect(await page.title()).toBe("Polymer • TodoMVC");
		await todosPage.EnterNewTodo("Playwright First Todo");
		testObject.logger.info("Completed TodoMVC part of Test");

		let secondaryPage = await context.newPage();
		await secondaryPage.goto("https://react-redux.realworld.io/");
		expect(await secondaryPage.title()).toBe("Conduit");
	});
});
