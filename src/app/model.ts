export class Model {
    user; items;

    constructor(){
        this.user="Zakari";
        this.items = [
            new ToDoItem("Do Task 1", 1, "Open", false),
            new ToDoItem("Do Task 2", 3, "Open", false),
            new ToDoItem("Do Task 3", 5, "Open", false)
        ]
    }
}

export class ToDoItem {
    task;
    rate;
    status;
    done;

    constructor(task, rate, status, done) {
        this.task= task;
        this.rate= rate;
        this.status=status;
        this.done=done;
    }
}
