import storage from "../services/localStorage";
import { Task } from "../constants";

class TaskModel {
    protected tasks: Task[];
    private lastTaskId: number;
    public getTasks(type?: string): Task[] {
        if (type) {
            return this.tasks;
        }
    
        const locationHash = window.location.hash;
        return locationHash === '#completed'
            ? this.tasks.filter((task: Task) => task.isCompleted)
            : locationHash === '#active'
            ? this.tasks.filter((task: Task) => !task.isCompleted)
            : this.tasks;
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
        const taskIndex: number | -1 = this.tasks.findIndex(
            (task) => task.id === taskId
        );

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


    toggleTask(id: number, type: string, renderTasks: (tasks: Task[]) => void) {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const formattedHours = hours % 24 || 24;
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const formattedTime = `${formattedHours}:${minutes}:${seconds.toString().padStart(2, '0')}, ${currentTime.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })}`;
    
        switch (type) {
            case 'active':
                this.tasks.forEach((task: Task) => {
                    if (task.id === id) {
                        task.isCompleted = true;
                        task.updatedAt = formattedTime;
                    }
                });
                break;
            case 'unactive':
                this.tasks.forEach((task: Task) => {
                    if (task.id === id) {
                        task.isCompleted = false;
                        task.updatedAt = formattedTime;
                    }
                });
                break;
            case 'toggle':
                const checkTask = this.tasks.find((item: Task) => !item.isCompleted);
                this.tasks.forEach((task: Task) => {
                    if (checkTask) {
                        if (!task.isCompleted) {
                            task.isCompleted = true;
                        }
                    } else {
                        task.isCompleted = false;
                    }
                    task.updatedAt = formattedTime;
                });
                break;
            default:
                break;
        }
    
        const locationHash = window.location.hash;
        locationHash === '#completed'
            ? this.filterTask('completed', renderTasks)
            : locationHash === '#active'
            ? this.filterTask('active', renderTasks)
            : renderTasks(this.tasks);
    
        storage.saveTasks(this.tasks);
    }
    
    checkAllToggleTask = (renderTasks: (tasks: Task[]) => void): void => {
        this.toggleTask(0, "toggle", renderTasks);
    };

    filterTask = (
        actionFilter: string,
        renderTasks: (tasks: Task[]) => void
    ) => {
        let taskFilters: null | Task[] = null;
        switch (actionFilter) {
            case "all": {
                taskFilters = this.tasks;
                break;
            }
            case "active": {
                taskFilters = this.tasks.filter((task) => !task.isCompleted);
                break;
            }
            case "completed": {
                taskFilters = this.tasks.filter((task) => task.isCompleted);
                break;
            }
            default: {
                taskFilters = this.tasks;
                break;
            }
        }
        renderTasks(taskFilters);
    };
    
    hasCompletedTasks(): boolean {
        return this.tasks.some((task) => task.isCompleted);
    }

    clearCompletedTasks = (renderTasks: (tasks: Task[]) => void): void => {
        this.tasks = this.tasks.filter((task) => !task.isCompleted);
        storage.saveTasks(this.tasks);
        renderTasks(this.tasks);
    };
}

export default TaskModel;
