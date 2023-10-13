import TaskView from "../views/task.view";
import TaskModel from "../models/task.model";

class TaskController {
    private taskModel: TaskModel;
    private taskView: TaskView; 

    constructor(taskModel: TaskModel, taskView: TaskView) {
        this.taskModel = taskModel;
        this.taskView = taskView;

        this.init();
        this.taskView.setTaskAddedHandler(this.handleTaskAdded);
    }

    public init = () => {
        this.taskView.renderTasks(this.taskModel.getTasks());
    };

    handleTaskAdded = (task: string) => {
        const trimmedTask = task.trim();

        if (trimmedTask !== "") {
            this.taskModel.addTask(trimmedTask);
            this.taskView.renderTasks(this.taskModel.getTasks());
        } else {
            console.warn("Empty task not added");
        }
    };

}

export default TaskController;
