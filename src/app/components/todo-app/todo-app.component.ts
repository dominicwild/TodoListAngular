import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

type TodoItem = {
  name: string,
  completed: boolean,
}

interface TodoFormItem {
  name: FormControl<string | null>;
  completed: FormControl<boolean | null>;
}

interface TodoForm {
  todos: FormArray<FormGroup<TodoFormItem>>;
  addItem: FormControl<string | null>
}

@Component({
  selector: 'todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent {

  todoItemsControls: FormGroup<TodoForm>

  constructor(private fb: FormBuilder) {
    this.todoItemsControls = fb.group<TodoForm>({
      todos: fb.array(this.createTodoItems()),
      addItem: new FormControl("")
    })
  }

  private createTodoItems(): FormGroup[] {
    return [
      this.createTodoItem({ name: "abc", completed: false }),
      this.createTodoItem({ name: "123", completed: true })
    ];
  }

  private createTodoItem(item: TodoItem): FormGroup<TodoFormItem> {
    return this.fb.group({
      name: new FormControl(item.name),
      completed: new FormControl(item.completed)
    });
  }

  get todos() {
    return this.todoItemsControls.get("todos") as TodoForm["todos"];
  }

  addItem() {
    console.log(this.todoItemsControls.controls.addItem);
    const addItemValue = this.todoItemsControls.controls.addItem.value
    if (addItemValue === null || addItemValue === "") {
      return;
    }
    const newItem = this.createTodoItem({ name: addItemValue, completed: false });
    this.todos.push(newItem);
    this.todoItemsControls.controls.addItem.reset()
  }

  addItemOnEnter(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.addItem();
    }
  }

  removeItem(index: number) {
    this.todos.removeAt(index)
  }
}
