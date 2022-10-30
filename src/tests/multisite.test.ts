import { test, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/todoMvc/homePage";
import * as testObjectClass from "../testSetup/testObject";
import { getBrowser } from "../testSetup/testInitializer";
import { Page, Browser} from "playwright";

test.describe("MultiSite Testing ", () => {
	let testObject: testObjectClass.testObject;
	let browser: Browser;
	let page: Page;

	test.beforeAll(async () => {
		browser = await getBrowser();
		page = await browser.newPage();
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

		let secondaryContext = await browser.newContext();
		let secondaryPage = await secondaryContext.newPage();
		await secondaryPage.goto("https://react-redux.realworld.io/");
		expect(await secondaryPage.title()).toBe("Conduit");
	});
});
