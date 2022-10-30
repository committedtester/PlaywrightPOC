# Playwright + Jest + TypeScript

Following on from the use of Puppeteer, I wanted to see what the original creators were doing at Microsoft with Playwright.
This repository contains a bit more logic for vscode, including debugging, prettier with automatic formatting on save.

# Installation Overview

Please run:

1. **npm install**
2. **npm init playwright@latest**
2. _Build typescript (see below)_
3. **npm run test**

## Build Typescript

As you are hopefully using vscode remember to

-   Open the command pallette (**CTRL+Shift+B**)
-   And select **tsc:watch**

This will automatically recompile your code whenever you save it. Typescript is currently writing to the dist folder

Alternatively in your terminal/command line run **npm run build** to trigger the process manually

## Additional Proxy Information
The revisit to this repository was based on a need to see if I could pipe Playwright to OWASP ZAP for security testing

To set this up
- Setup OWASP ZAP local docker container **docker run -u zap -p 8080:8080 -p 8090:8090 -i owasp/zap2docker-stable zap-webswing.sh**
- Then establish your OS's version of environment variables **$env:PROXY='http://localhost:8090'**
- Run the test again and go to http://localhost:8080/zap/ 
