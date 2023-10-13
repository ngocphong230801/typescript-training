import { querySelector, getElementById } from "../helpers";
import { keys } from "../constants/keys";

class TaskView {
    private loadingElement: HTMLElement | null;
    private taskList: HTMLElement;
    private taskInput: HTMLElement;
    private onTaskAdded: (task: string) => void;

    constructor() {
        window.addEventListener("load", async () => {
            this.loadingElement = querySelector(".app__loading") as HTMLElement;

            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (this.loadingElement) {
                this.loadingElement.style.display = "none";
            } else {
                console.error("Loading element not found");
            }
        });

        this.taskList = querySelector(".list-of-tasks") as HTMLElement;
        this.taskInput = getElementById("task-input") as HTMLElement;
        this.init();
    }

    init: () => void = () => {
        this.taskInput.addEventListener("keyup", this.handleTaskInput);
    }

    renderTasks: (tasks: { id: number; content: string }[]) => void = (tasks) => {
        this.taskList.innerHTML = tasks.map((task: { id: number; content: string }) => 
        `<li data-id="${task.id}" class="content-data">
            <i class="fa fa-circle-o task-icon"></i>
            <p class="task-content">${task.content}</p>
            <i class="fa fa-times close-task"></i>   
         </li>`).join("");
    };

    handleTaskInput = (event: KeyboardEvent) => {
        if (event.key === keys.Enter) {
            const newTask = (event.target as HTMLInputElement).value;
            (event.target as HTMLInputElement).value = "";
            this.onTaskAdded(newTask);
        }
    }

    setTaskAddedHandler = (callback: (task: string) => void) => {
        this.onTaskAdded = callback;
    }
}

export default TaskView;
