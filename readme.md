# Playwright + Jest + TypeScript

Following on from the use of Puppeteer, I wanted to see what the original creators were doing at Microsoft with Playwright.
This repository contains a bit more logic for vscode, including debugging, prettier with automatic formatting on save.

# Installation Overview

Please run:

1. **npm install**
2. **npm init playwright@latest**
3. _Build typescript (see below)_
4. **npm run test**

## Build Typescript

As you are hopefully using vscode remember to

-   Open the command pallette (**CTRL+Shift+B**)
-   And select **tsc:watch**

This will automatically recompile your code whenever you save it. Typescript is currently writing to the dist folder

Alternatively in your terminal/command line run **npm run build** to trigger the process manually

## Additional Proxy Information

The revisit to this repository was based on a need to see if I could pipe Playwright to OWASP ZAP for security testing

To set this up
-   I needed to create an API key for secure communications **$env:APIKEY='mykey'**
-   Setup OWASP ZAP local docker container **docker run --name zap -u zap -p 8080:8080 -p 8090:8090 -i owasp/zap2docker-stable zap-webswing.sh -config api.key=$env:APIKEY**
-   Then establish your OS's version of environment variables **$env:PROXY='http://localhost:8090'**
-   Run the test again and go to http://localhost:8080/zap/

**docker exec -it zap /bin/sh**

Learnings
Found that the webswing support means that API access is not present!
https://github.com/zaproxy/zaproxy/issues/3497

Headless ZAP
**docker run -p 8090:8090 -i owasp/zap2docker-stable zap.sh -daemon -port 8090 -host 0.0.0.0 -config api.key=$env:APIKEY -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true**

* Read the OWASP API
https://www.zaproxy.org/docs/api/#overview
