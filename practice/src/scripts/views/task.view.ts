import { querySelector, getElementById } from "../helpers";
import { keys } from "../constants/keys";

class TaskView {
    private loadingElement: HTMLElement | null;
    private taskList: HTMLElement;
    private taskInput: HTMLElement;
    private onTaskAdded: (task: string) => void;
    private onTaskClosed: (taskId: number) => void;
    private confirmDialog: HTMLElement;
    private overlay: HTMLElement;
    private currentTaskId: number | null = null;


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
        this.handleTaskClose = this.handleTaskClose.bind(this);

        this.confirmDialog = getElementById("confirm-dialog") as HTMLElement;
        this.overlay = getElementById("overlay") as HTMLElement;

        const confirmYesButton = getElementById("confirm-yes") as HTMLElement;
        const confirmCancelButton = getElementById("confirm-cancel") as HTMLElement;

        confirmYesButton.addEventListener("click", this.handleConfirmYes);
        confirmCancelButton.addEventListener("click", this.handleConfirmCancel);
        this.init();
    }

    init = (): void => {
        this.taskInput.addEventListener("keyup", this.handleTaskInput);
    };

    renderTasks = (tasks: { id: number; content: string }[]): void => {
        if (!this.taskList) {
            console.error("Task list element not found");
            return;
        }

        this.taskList.innerHTML = tasks
            .map(({ id, content }: { id: number; content: string }) => 
                `<li data-id="${id}" class="content-data">
                    <i class="fa fa-circle-o task-icon"></i>
                    <p class="task-content">${content}</p>
                    <i class="fa fa-times close-task" data-task-id="${id}"></i>   
                 </li>`
            )
            .join("");

            const closeIcons = this.taskList.querySelectorAll('.close-task');
            closeIcons.forEach(icon => {
                icon.addEventListener('click', this.handleTaskClose as EventListener);
            });
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

    handleTaskClose = (event: MouseEvent): void => {
        const taskId = (event.currentTarget as HTMLElement).getAttribute('data-task-id');

        if (taskId) {
            this.showConfirmDialog();
            this.currentTaskId = Number(taskId);
        }
    };

    handleConfirmYes = (): void => {
        if (this.currentTaskId !== null) {
            this.onTaskClosed(this.currentTaskId);
            this.hideConfirmDialog();
            this.currentTaskId = null;
        }
    };

    handleConfirmCancel = (): void => {
        this.hideConfirmDialog();

        this.currentTaskId = null;
    };

    showConfirmDialog = (): void => {
        this.confirmDialog.style.display = "block";
        this.overlay.style.display = "block";
    };

    hideConfirmDialog = (): void => {
        this.confirmDialog.style.display = "none";
        this.overlay.style.display = "none";
    };



    setTaskAddedHandler = (callback: (task: string) => void): void => {
        this.onTaskAdded = callback;
    };

    setTaskClosedHandler = (callback: (taskId: number) => void): void => {
        this.onTaskClosed = callback;
    };
}

export default TaskView;
