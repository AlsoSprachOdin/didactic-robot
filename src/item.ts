
export default class Item {
    task: string;
    deadline?: Date;

    constructor(task: string, deadline?: Date) {
        this.task = task;
        this.deadline = deadline;
    }
};
