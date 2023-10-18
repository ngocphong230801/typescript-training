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
        this.taskView.setTaskEditedHandler(this.handleTaskEdited);
    }

    public init = (): void =>  {
        this.taskView.renderTasks(this.taskModel.getTasks());
        this.taskView.setTaskAddedHandler(this.handleTaskAdded);
        this.taskView.setTaskClosedHandler(this.handleTaskClosed);
        this.taskView.setTaskEditedHandler(this.handleTaskEdited);
    };

    handleTaskAdded = (task: string): void => {
        const taskName: string = task.trim();
    
        if (taskName) {
            this.taskModel.addTask(taskName);
            this.taskView.renderTasks(this.taskModel.getTasks());
        } else {
            console.warn("Empty task not added");
        }
    };

    handleTaskClosed = (taskId: number): void  => {
        this.taskModel.setCurrentTaskId(taskId);
        this.taskModel.removeTask();
        this.taskView.renderTasks(this.taskModel.getTasks());
    };

    handleTaskEdited = (taskId: number, newContent: string): void => {
        this.taskModel.editTask(taskId, newContent);
        this.taskView.renderTasks(this.taskModel.getTasks());
    };
    
}

export default TaskController;
