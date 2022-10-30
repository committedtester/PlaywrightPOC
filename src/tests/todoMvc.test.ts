import { test, expect } from "@playwright/test";
import { HomePage } from "../pageObjects/todoMvc/homePage";
import * as testObjectClass from "../testSetup/testObject";
import { Page, Browser} from "playwright";
import { getBrowser } from "../testSetup/testInitializer";

test.describe("TodoMVC PageObject POC ", () => {
	let testObject: testObjectClass.testObject;
	let browser: Browser;
	let page:Page;

	test.beforeAll(async () => {
		browser = await getBrowser();
		page = await browser.newPage();
	});

	let testId003 = "T003";
	test(`${testId003}Navigation and Creation of single todo`, async () => {
		testObject = await testObjectClass.createTestObject(page, testId003);
		let homePage = new HomePage(testObject);
		await homePage.GotoTodosURL();
		expect(await page.title()).toBe("TodoMVC");
		let todosPage = await homePage.ClickPolymerLink();
		expect(await page.title()).toBe("Polymer • TodoMVC");
		await todosPage.EnterNewTodo("Playwright First Todo");
	});

	let testId004 = "T004";
	test(`${testId004}Editing of todo`, async () => {
		testObject = await testObjectClass.createTestObject(page, testId004);
		let homePage = new HomePage(testObject);
		await homePage.GotoTodosURL();
		let todosPage = await homePage.ClickPolymerLink();
		await todosPage.EnterNewTodo("Playwright First Todo");
		await todosPage.EnterNewTodo("Playwright Second Todo");
		await todosPage.EditTodo(2, "Playwright Edited Second Todo");
	});
});
