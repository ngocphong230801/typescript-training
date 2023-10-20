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
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const formattedHours = (hours % 24) || 24;
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const formattedTime = `${formattedHours}:${minutes}:${seconds.toString().padStart(2, '0')}, ${currentTime.toLocaleDateString(
            "en-US",
            { year: "numeric", month: "short", day: "numeric" }
        )}`;
    
        const newTask: Task = {
            id: this.lastTaskId++,
            content: task,
            createdAt: formattedTime,
            updatedAt: formattedTime,
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

    editTask = (taskId: number, newContent: string): void => {
        const taskIndex: number | -1 = this.tasks.findIndex(task => task.id === taskId);
    
        if (taskIndex !== -1) {
            this.tasks[taskIndex].content = newContent;
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const formattedHours = (hours % 24) || 24;
            const minutes = currentTime.getMinutes();
            const seconds = currentTime.getSeconds();
            const formattedTime = `${formattedHours}:${minutes}:${seconds.toString().padStart(2, '0')}, ${currentTime.toLocaleDateString(
                "en-US",
                { year: "numeric", month: "short", day: "numeric" }
            )}`;
            this.tasks[taskIndex].updatedAt = formattedTime;
            storage.saveTasks(this.tasks);
        }
    };
}

export default TaskModel;
