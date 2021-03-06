import * as initializer from "../testSetup/initializer";
import { HomePage } from "../pageObjects/todoMvc/homePage";
import * as testObjectClass from "../testSetup/testObject";
import { Page, Browser, BrowserContext } from "playwright";

describe("TodoMVC PageObject POC ", () => {
	let browser: Browser;
	let primaryPage: Page;
	let context: BrowserContext;
	let testObject: testObjectClass.testObject;

	beforeAll(async () => {
		browser = await initializer.defaultBeforeAll();
	});
	afterAll(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		context = await initializer.createNewContext(browser);
		primaryPage = await context.newPage();
	});
	afterEach(async () => {
		await testObject.stopRecording();
	});

	let testId003 = "T003";
	it(`${testId003}Navigation and Creation of single todo`, async () => {
		testObject = await testObjectClass.createTestObject(primaryPage, testId003);
		let homePage = new HomePage(testObject);
		await homePage.GotoTodosURL();
		expect(await primaryPage.title()).toBe("TodoMVC");
		let todosPage = await homePage.ClickPolymerLink();
		expect(await primaryPage.title()).toBe("Polymer • TodoMVC");
		await todosPage.EnterNewTodo("Playwright First Todo");
	});

	let testId004 = "T004";
	it(`${testId004}Editing of todo`, async () => {
		testObject = await testObjectClass.createTestObject(primaryPage, testId004);
		let homePage = new HomePage(testObject);
		await homePage.GotoTodosURL();
		let todosPage = await homePage.ClickPolymerLink();
		await todosPage.EnterNewTodo("Playwright First Todo");
		await todosPage.EnterNewTodo("Playwright Second Todo");
		await todosPage.EditTodo(2, "Playwright Edited Second Todo");
	});
});
