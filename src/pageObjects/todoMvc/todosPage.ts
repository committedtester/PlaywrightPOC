export class Todospage {
	page;
	constructor(page) {
		this.page = page;
	}

	idNewTodo = "input[id=new-todo]";
	idExistingTodo = "ul[class='todo-list style-scope td-todos']  li:nth-of-type(numberVar) label";

	EnterNewTodo = async (stringEntry: string) => {
		await this.page.type(this.idNewTodo, stringEntry);
		await this.page.keyboard.press("Enter");
	};

	EditTodo = async (todoNumber: number, stringEntry: string) => {
		const editTodo: string = this.idExistingTodo.replace("numberVar", todoNumber.toString());
		await this.page.click(editTodo, { clickCount: 2 });
		let todoElement = await this.page.$(editTodo);
		let todoText = await todoElement.innerText();

		for (let index = 0; index < todoText.length; index++) {
			await this.page.keyboard.press("Backspace");           
		}

		await this.page.type(editTodo, stringEntry);
		await this.page.keyboard.press("Enter");
	};
}
