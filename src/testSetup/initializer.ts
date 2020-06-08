import playwright from "playwright";

export const defaultBeforeAll = async () => {
	return await playwright.chromium.launch({ headless: true, devtools: true }); //
};

export const defaultBeforeEach = async (browser) => {
	let context = await browser.newContext({
		viewport: {
			width: 1820,
			height: 980
		}
	});
	return await context.newPage();
};
