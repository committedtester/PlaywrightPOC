import { Todospage } from "./todosPage";

export class HomePage {
	page;
	constructor(page) {
		this.page = page;
	}

	idPolymerLink = "a[data-source='http://polymer-project.org']";
	idPolymerWaitFor = "div[class='todoapp'] h1";

	GotoTodosURL = async () => {
		await this.page.goto("http://todomvc.com//");
	};
	ClickPolymerLink = async () => {
		await this.page.click(this.idPolymerLink);
		await this.page.waitForSelector(this.idPolymerWaitFor);
		return new Todospage(this.page);
	};
}
