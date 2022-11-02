import { test, expect } from "@playwright/test";
import fetch from "node-fetch";

test.describe("Confirm OWASP API", () => {
	interface ZAPAlerts {
		alertsByRisk: AlertsByRisk[];
	}

	interface AlertsByRisk {
		Informational?: Alert[];
		Low?: Alert[];
		Medium?: Alert[];
		High?: Alert[];
	}

	interface Alert {
		[key: string]: AlertInformation[];
	}

	interface AlertInformation {
		param: string;
		confidence: Confidence;
		name: string;
		risk: Risk;
		id: string;
		url: string;
	}

	enum Confidence {
		High = "High",
		Low = "Low",
		Medium = "Medium"
	}

	enum Risk {
		Informational = "Informational",
		Low = "Low",
		Medium = "Medium"
	}

	test(`Confirm OWASP API`, async () => {
		const url = `http://localhost:8090/JSON/alert/view/alertsByRisk/?apikey=${process.env.APIKEY}&baseurl='https://todomvc.com'&recurse=`;
		console.log(url);
		const response = await fetch(url);
		const data: ZAPAlerts = await response.json();

		console.log(data.alertsByRisk[0].Medium);
		
		if (data.alertsByRisk[0].Medium != undefined) {
			console.log(data.alertsByRisk[0].Medium[0]);
		}

		let alertCount: number = 0;
		let invalidAlertTypes: string[] = ["Medium", "High"];

		for (let index = 0; index < data.alertsByRisk.length; index++) {
			let currentAlertType = Object.keys(data.alertsByRisk[index])[0];

			if (invalidAlertTypes.includes(currentAlertType)) {
				console.log(`Risk Type is ${currentAlertType}`);
				alertCount++;
			}
		}

		if (alertCount >= 0) {
			if (data.alertsByRisk[0].High != undefined) {
				console.log(data.alertsByRisk[0].High[0]);
			}
			if (data.alertsByRisk[0].Medium != undefined) {
				console.log(data.alertsByRisk[0].Medium[0]);
			}
			test.expect(alertCount).toBe(0);
		}
	});
});
