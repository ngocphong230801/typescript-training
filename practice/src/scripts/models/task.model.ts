import storage from "../services/localStorage";

interface Task {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    isCompleted: boolean;
}

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
