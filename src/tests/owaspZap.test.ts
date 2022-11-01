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

	test(`Confirm OWASP API`, async () => {
		const url = `http://localhost:8090/JSON/alert/view/alertsByRisk/?apikey=${process.env.APIKEY}&baseurl='https://todomvc.com'&recurse=`;
		console.log(url);
		const response = await fetch(url);
		const data: RootObject = await response.json();
		console.log(data.alertsByRisk[0]);

		//console.log(data.alertsByRisk.find(e=>e.Informational='Informational'))
	});
});
