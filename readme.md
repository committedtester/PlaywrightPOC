# Playwright + Jest + TypeScript

Following on from the use of Puppeteer, I wanted to see what the original creators were doing at Microsoft with Playwright.
This repository contains a bit more logic for vscode, including debugging, prettier with automatic formatting on save.
It also contains new information for integration with OWASP ZAP

# Installation Overview

Please run:

1. **npm install**
2. **npm init playwright@latest**
3. _Build typescript (see below)_
4. **npm run test**

NOTE: The owaspzap.test.ts will fail due to a timeout issue (keep reading for more setup)

## Build Typescript

As you are hopefully using vscode remember to

-   Open the command pallette (**CTRL+Shift+B**)
-   And select **tsc:watch**

This will automatically recompile your code whenever you save it. Typescript is currently writing to the dist folder
Alternatively in your terminal/command line run **npm run build** to trigger the process manually

## OWASP ZAP: Additional Proxy Information

The revisit to this repository was based on a need to see if I could pipe Playwright to OWASP ZAP for security testing

To set this up I needed a docker container

-   In a production context I needed a secure key to connect with **$env:APIKEY='mykey'**
-   I needed a local OWASP ZAP local docker container
    **docker run -p 8090:8090 -i owasp/zap2docker-stable zap.sh -daemon -port 8090 -host 0.0.0.0 -config api.key=$env:APIKEY -config api.addrs.addr.name=.* -config api.addrs.addr.regex=true**
-   Confirm it's functional by going to http://localhost:8090

Then I needed to run my playwright tests again.

-   For this command line again set **$env:APIKEY='mykey'**
-   Then the local port you are sending traffic to **$env:PROXY='http://localhost:8090'**
-   Run the tests again.
-   The owaspzap.test.ts will fail correctly as it has identified Medium Security Issues

# Learnings

## API Access

I uncovered a bit too later, that the the webswing support means that API access is not present
https://github.com/zaproxy/zaproxy/issues/3497

The Docker documentation for ZAP references this
**docker run -u zap -v ${pwd}:/zap/wrk/:rw -p 8080:8080 -p 8090:8090 -i owasp/zap2docker-stable zap-webswing.sh -config api.key=$env:APIKEY**
Use the above for understanding OWASP ZAP, but you won't be able to access the underlying API for extraction of alerts.
(Use the docker command I specified above)

## Read the OWASP API

https://www.zaproxy.org/docs/api/#overview

## Reference the OWASP ZAP API (not via webswing)

http://localhost:8090/UI

# To Do
The output of the failure text isn't as user friendly as I would have liked. Need to spend some time on parsing the dynamic keys provided in the API output (see exampleZAP\todomvc.json)

Update code to set environment variables outside of the command line, to remove the launch.json hardcoding for debugging

Refactor the owaspZap.test.ts to move the interfaces and helper methods to a seperate class