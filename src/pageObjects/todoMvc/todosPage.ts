import { testObject } from "../../testSetup/testObject";
import * as element from "../../helpers/playwright/element";
export class Todospage {
	testObject;
	constructor(testObject: testObject) {
		this.testObject = testObject;
	}

	idNewTodo = "input[id=new-todo]";
	idExistingTodo = "ul[class='todo-list style-scope td-todos']  li:nth-of-type(numberVar) label";

	EnterNewTodo = async (stringEntry: string) => {
		await element.type(this.testObject, this.idNewTodo, stringEntry);
		await this.testObject.page.keyboard.press("Enter");
	};

	EditTodo = async (todoNumber: number, stringEntry: string) => {
		const editTodo: string = this.idExistingTodo.replace("numberVar", todoNumber.toString());
		await element.click(this.testObject, editTodo, { clickCount: 2 });
		let todoText = await element.getInnerText(this.testObject, editTodo);

		for (let index = 0; index < todoText.length; index++) {
			await this.testObject.page.keyboard.press("Backspace");
		}
		await element.type(this.testObject, editTodo, stringEntry);
		await this.testObject.page.keyboard.press("Enter");
	};
}
