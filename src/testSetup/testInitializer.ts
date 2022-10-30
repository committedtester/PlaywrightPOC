import { Browser, chromium } from "playwright";

export const getBrowser = async () => {
	let browser: Browser;
	if (process.env.proxy !== undefined) {
		browser = await chromium.launch({
			proxy: {
				server: process.env.proxy
			}
		});
	} else {
		browser = await chromium.launch();
	}
	return browser;
};
