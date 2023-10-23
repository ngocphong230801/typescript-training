import storage from "../services/localStorage";
import { Task } from "../constants";

class TaskModel {
    protected tasks: Task[];
    private lastTaskId: number;
    public getTasks(type?: string): Task[] {
        if (type) {
            return this.tasks;
        } else {
            if (window.location.hash === "#completed") {
                return this.tasks.filter((task: Task) => task.isCompleted);
            } else if (window.location.hash === "#active") {
                return this.tasks.filter((task: Task) => !task.isCompleted);
            } else {
                return this.tasks;
            }
        }
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


    toggleTask = (
        id: number,
        type: string,
        renderTasks: (tasks: Task[]) => void
    ) => {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const formattedHours = hours % 24 || 24;
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        const formattedTime = `${formattedHours}:${minutes}:${seconds
            .toString()
            .padStart(2, "0")}, ${currentTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })}`;

        if (type === "active") {
            this.tasks.forEach((task: Task) => {
                if (task.id == id) {
                    task.isCompleted = true;
                    task.updatedAt = formattedTime;
                }
            });
        } else if (type === "unactive") {
            this.tasks.forEach((task: Task) => {
                if (task.id == id) {
                    task.isCompleted = false;
                    task.updatedAt = formattedTime;
                }
            });
        } else if (type === "toggle") {
            const checkTask = this.tasks.find(
                (item: Task) => !item.isCompleted
            );

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
        }

        if (window.location.hash === "#completed") {
            this.filterTask("completed", renderTasks);
        } else if (window.location.hash === "#active") {
            this.filterTask("active", renderTasks);
        } else {
            renderTasks(this.tasks);
        }
        storage.saveTasks(this.tasks);
    };

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

}

export default TaskModel;
