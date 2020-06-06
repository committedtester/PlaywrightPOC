module.exports = {
  
    launchBrowserApp: {
      headless: false
    },
    context: {
      ignoreHTTPSErrors: true,
      viewport: {
        width: 1920,
        height: 1080
      }
    },
    browsers: ["chromium"],
    //browsers: ["chromium", "firefox"],
    devices: []
  }