import { test, expect } from "@playwright/test";
import fetch from "node-fetch";

test.describe("Confirm OWASP API", () => {
	interface RootObject {
		alertsByRisk: AlertsByRisk[];
	}

	interface AlertsByRisk {
		Informational: Informational[];
		Low: Low[];
		Medium: Medium[];
		High: High[];
	}

	interface Medium {
		[key: string]: AlertInstance[];
	}
	interface Low {
		[key: string]: AlertInstance[];
	}
	interface Informational {
		[key: string]: AlertInstance[];
	}
	interface High {
		[key: string]: AlertInstance[];
	}

	interface AlertInstance {
		param: string;
		confidence: string;
		name: string;
		risk: string;
		id: string;
		url: string;
	}

	const getCountOfAlertRisk = (alertArray: AlertsByRisk[], alertName: string): number => {
		const alertRiskIndex = getAlertRiskIndex(alertArray, alertName);
		return alertArray[alertRiskIndex][alertName].length;
	};

	const getAlertRiskIndex = (alertArray: AlertsByRisk[], alertName: string): number => {
		let riskIndex = 0;
		for (let index = 0; index < alertArray.length; index++) {
			let test = alertArray[index][alertName];
			if (test != undefined) {
				riskIndex = index;
			}
		}
		return riskIndex;
	};

	const getAlertArray = (alertArray: AlertsByRisk[], alertName: string): string[] => {
		const alertRiskIndex = getAlertRiskIndex(alertArray, alertName);
		let alertText: string[] = [];
		for (let index = 0; index < alertArray[alertRiskIndex][alertName].length; index++) {
			let textValue = alertArray[alertRiskIndex][alertName][index];
			alertText.push(textValue);
		}
		return alertText;
	};

	const getAlertText = (alertArray: AlertsByRisk[], alertName: string): string => {
		const alertRiskIndex = getAlertRiskIndex(alertArray, alertName);
		let alertText: string = `Alert information for ${alertName}:\n\n `;
		for (let index = 0; index < alertArray[alertRiskIndex][alertName].length; index++) {
			let textValue = alertArray[alertRiskIndex][alertName][index];
			alertText = alertText.concat(JSON.stringify(textValue) + "\n\n");
		}
		return alertText;
	};

	test(`Confirm OWASP API`, async () => {
		const url = `http://localhost:8090/JSON/alert/view/alertsByRisk/?apikey=${process.env.APIKEY}&baseurl='https://todomvc.com'&recurse=`;
		console.log(`Reference URL for local OWASP ZAP \n${url}\n`);
		const response = await fetch(url);
		const data: RootObject = await response.json();

		let dataAlerts = data.alertsByRisk;

		let mediumAlertCount = getCountOfAlertRisk(dataAlerts, "Medium");
		let highAlertCount = getCountOfAlertRisk(dataAlerts, "High");

		await expect(
			mediumAlertCount + highAlertCount,
			`No High or Medium Alerts should be found.\n 
			${getAlertText(dataAlerts, "High")} 
			${getAlertText(dataAlerts, "Medium")}`
		).toBe(0);
	});
});
