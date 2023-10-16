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

            this.loadingElement.style.display = "none";
            if (!this.loadingElement) {
                console.error("Loading element not found");
            }
        });

        this.taskList = querySelector(".list-of-tasks") as HTMLElement;
        this.taskInput = getElementById("task-input") as HTMLElement;
        this.init();
    }

    init = (): void => {
        this.taskInput.addEventListener("keyup", this.handleTaskInput);
    };

    renderTasks = (tasks: { id: number; content: string }[]): void => {
        this.taskList.innerHTML = tasks.map(({ id, content }: { id: number; content: string }) => 
        `<li data-id="${id}" class="content-data">
            <i class="fa fa-circle-o task-icon"></i>
            <p class="task-content">${content}</p>
            <i class="fa fa-times close-task"></i>   
         </li>`
        ).join("");
    };

    handleTaskInput = (event: KeyboardEvent): void => {
        if (event.key === keys.Enter) {
            const newTask = (event.target as HTMLInputElement).value.trim();
            (event.target as HTMLInputElement).value = "";
            if (newTask) {
                this.onTaskAdded(newTask);
            }
        }
    };

    setTaskAddedHandler = (callback: (task: string) => void): void => {
        this.onTaskAdded = callback;
    };
}

export default TaskView;
