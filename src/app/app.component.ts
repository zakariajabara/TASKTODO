import { Component } from '@angular/core';
import {Model, ToDoItem} from "./model";

@Component({
  selector: 'todo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  model = new Model();
  //title = 'taskToDo';

  getName() {
    return this.model.user;
  }

  getTodoItems() {
    return this.model.items;
  }

  addItem(newItem) {
    if(newItem != "") {
      this.model.items.push(new ToDoItem(newItem,1,"Open",false));
    }
  }
}
