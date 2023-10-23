import TaskView from "../views/task.view";
import TaskModel from "../models/task.model";
import { querySelectorAll } from "../helpers";

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
        this.handleReloadWindows();
    }

    public init = (): void =>  {
        this.taskView.renderTasks(this.taskModel.getTasks());
        this.taskView.setTaskAddedHandler(this.handleTaskAdded);
        this.taskView.setTaskClosedHandler(this.handleTaskClosed);
        this.taskView.setTaskEditedHandler(this.handleTaskEdited);
    };

    handleCheckAllToggleTask = (): void => {
        this.taskModel.checkAllToggleTask(this.taskView.renderTasks);
    };

    handleReloadWindows = (): void => {
        const status = window.location.hash;
        let elements: NodeList = querySelectorAll(".task-filter-item > a");

        elements.forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.classList.remove("active-btn");
                if (element.dataset.action === status.slice(1, status.length)) {
                    if (
                        element.dataset.action ===
                        status.slice(1, status.length)
                    ) {
                        element.classList.add("active-btn");
                    }
                }
            }
        });
    };

    handleFilterTask = (actionFilter: string): void => {
        this.taskModel.filterTask(actionFilter, this.taskView.renderTasks);
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

    handleToggleCompleted = (id: number, type: string): void => {
        this.taskModel.toggleTask(id, type, this.taskView.renderTasks);
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
