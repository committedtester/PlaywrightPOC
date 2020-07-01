import playwright, { Browser } from "playwright";

export const defaultBeforeAll = async () => {
	return await playwright.chromium.launch({ headless: true, devtools: true }); //
};

export const createNewContext = async (browser:Browser) => {
	let context = await browser.newContext({
		viewport: {
			width: 1820,
			height: 980
		}
	});
	return context;
};
