module.exports = {
	testTimeout: 30000,
	//headless:false,
	//devtools:true,
	context: {
		ignoreHTTPSErrors: true
	},
	browsers: ["chromium"],
	//browsers: ["chromium", "firefox"],
	devices: []
};
