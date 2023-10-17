import storage from "../services/localStorage";
import { Task } from "../constants";

class TaskModel {
    protected tasks: Task[];
    private lastTaskId: number;
    public getTasks(): Task[] {
        return this.tasks;
    }
    private currentTaskId: number | null = null;

    constructor() {
        this.init();
    }

    init = (): void => {
        this.tasks = storage.getTasks();
        this.lastTaskId = 0;
    };

    addTask = (task: string): void => {
        const newTask: Task = {
            id: this.lastTaskId++,
            content: task,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isCompleted: false,
        };
        
        this.tasks.unshift(newTask);
        storage.saveTasks(this.tasks);
    };

    setCurrentTaskId = (taskId: number): void => {
        this.currentTaskId = taskId;
    };

    removeTask = (): void => {
        if (this.currentTaskId !== null) {
            this.tasks = this.tasks.filter(task => task.id !== this.currentTaskId);
            storage.saveTasks(this.tasks);
        }
    };
}

export default TaskModel;
