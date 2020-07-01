import { Todospage } from "./todosPage";
import { testObject } from "../../testSetup/testObject";
import * as page from "../../helpers/playwright/page";
import * as element from "../../helpers/playwright/element";

export class HomePage {
	testObject;
	constructor(testObject: testObject) {
		this.testObject = testObject;
	}

	idPolymerLink = "a[data-source='http://polymer-project.org']";
	idPolymerWaitFor = "div[class='todoapp'] h1";

	GotoTodosURL = async () => {
		await page.goto(this.testObject, "http://todomvc.com//");
	};
	ClickPolymerLink = async () => {
		await element.click(this.testObject, this.idPolymerLink);
		await element.waitForSelector(this.testObject, this.idPolymerWaitFor);
		return new Todospage(this.testObject);
	};
}
