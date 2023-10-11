import storage from "../services/localStorage";
import { Task } from "../constants";

class TaskModel {
    private tasks: Task[];
    private lastTaskId: number;

    constructor() {
        this.init();
    }

    private init = () => {
        this.tasks = storage.getTasks();
    };

}

export default TaskModel;
