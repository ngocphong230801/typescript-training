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
        this.taskView.setToggleCompleted(this.handleToggleCompleted);
        this.taskView.setTaskFilter(this.handleFilterTask);
        this.taskView.setCheckAllToggleTask(this.handleCheckAllToggleTask);
        this.taskView.setClearCompletedHandler(this.handleClearCompleted);
    }

    public init = (): void =>  {
        this.taskView.renderTasks(this.taskModel.getTasks());
        this.taskView.setTaskAddedHandler(this.handleTaskAdded);
        this.taskView.setTaskClosedHandler(this.handleTaskClosed);
        this.taskView.setTaskEditedHandler(this.handleTaskEdited);
        this.taskView.updateClearCompletedButtonVisibility();
    };

    handleCheckAllToggleTask = (): void => {
        this.taskModel.checkAllToggleTask(this.taskView.renderTasks);
        this.taskView.updateClearCompletedButtonVisibility();
    };

    handleFilterTask = (actionFilter: string): void => {
        this.taskModel.filterTask(actionFilter, this.taskView.renderTasks);
    };

    handleTaskAdded = (task: string): void => {
        const taskName: string = task.trim();
    
        if (taskName) {
            this.taskModel.addTask(taskName);
            this.taskView.renderTasks(this.taskModel.getTasks());
            this.taskView.updateClearCompletedButtonVisibility();
        } else {
            console.warn("Empty task not added");
        }
    };

    handleToggleCompleted = (id: number, type: string): void => {
        this.taskModel.toggleTask(id, type, this.taskView.renderTasks);
        this.taskView.updateClearCompletedButtonVisibility();
    };

    handleTaskClosed = (taskId: number): void  => {
        this.taskModel.setCurrentTaskId(taskId);
        this.taskModel.removeTask();
        this.taskView.renderTasks(this.taskModel.getTasks());
        this.taskView.updateClearCompletedButtonVisibility();
    };

    handleTaskEdited = (taskId: number, newContent: string): void => {
        this.taskModel.editTask(taskId, newContent);
        this.taskView.renderTasks(this.taskModel.getTasks());
        this.taskView.updateClearCompletedButtonVisibility();
    };

    handleClearCompleted = (): void => {
        this.taskModel.clearCompletedTasks(this.taskView.renderTasks);
    };
}

export default TaskController;
