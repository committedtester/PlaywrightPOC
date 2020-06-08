const { saveVideo } = require("playwright-video");
import * as initializer from "./../testSetup/initializer";
import { HomePage } from "./../pageObjects/todoMvc/homePage";


describe("TodoMVC PageObject POC ", () => {
	let browser: any;
	let page: any;
	let context: any;
	let capture: any;

	beforeAll(async () => {
		browser = await initializer.defaultBeforeAll();
	});
	afterAll(async () => {
		await browser.close();
	});

	beforeEach(async () => {
		context = await browser.newContext({
			viewport: {
				width: 1820,
				height: 980
			}
		});
		page = await context.newPage();
	});
	afterEach(async () => {
		await capture.stop();
		await page.close();
	});

	let testId003 = "T003";
	it(`${testId003}Navigation and Creation of single todo`, async () => {
		let homePage = new HomePage(page);
		capture = await saveVideo(page, `./videos/${testId003}.mp4`);
		await homePage.GotoTodosURL();
		expect(await page.title()).toBe("TodoMVC");
		let todosPage = await homePage.ClickPolymerLink();
		expect(await page.title()).toBe("Polymer • TodoMVC");
		await todosPage.EnterNewTodo("Playwright First Todo");
	});

	let testId004 = "T004";
	it(`${testId004}Editing of todo`, async () => {
		let homePage = new HomePage(page);
		capture = await saveVideo(page, `./videos/${testId004}.mp4`);
		await homePage.GotoTodosURL();
		let todosPage = await homePage.ClickPolymerLink();
		await todosPage.EnterNewTodo("Playwright First Todo");
		await todosPage.EnterNewTodo("Playwright Second Todo");
		await todosPage.EditTodo(2, "Playwright Edited Second Todo");
	});
});
