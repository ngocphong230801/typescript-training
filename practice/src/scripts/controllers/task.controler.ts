import TaskView from "../views/task.view";
import TaskModel from "../models/task.model";

class TaskController {
    private taskModel: TaskModel;
    private taskView: TaskView; 

    constructor(taskModel: any, taskView: TaskView) {
        this.taskModel = taskModel;
        this.taskView = taskView;

        this.init();
    }

    public init = () => {
       
    };

}

export default TaskController;
