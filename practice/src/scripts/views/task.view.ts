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
    private onTaskEdited: (taskId: number, newContent: string) => void;


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
                    <div class="editable-content" data-task-id="${id}" data-content="${content}">
                        <p class="task-content">${content}</p>
                        <input type="text" class="edit-input" style="display: none">
                    </div>
                    <i class="fa fa-times close-task" data-task-id="${id}"></i>   
                </li>`
            )
            .join("");

        const closeIcons = this.taskList.querySelectorAll('.close-task');
        closeIcons.forEach((icon: Element) => {
            icon.addEventListener('click', this.handleTaskClose as EventListener);
        });

        const contentDataItems = this.taskList.querySelectorAll('.content-data');
        contentDataItems.forEach((item: Element) => {
            const contentText = item.querySelector('.task-content') as HTMLElement;
            const editInput = item.querySelector('.edit-input') as HTMLInputElement;

            item.addEventListener('dblclick', () => {
                this.toggleElementVisibility(editInput, contentText);
                editInput.value = contentText.innerText;
                editInput.focus();
                editInput.classList.add('input-edit');
                editInput.addEventListener('keyup', (event) => {
                    if (event.key === 'Enter') {
                        contentText.innerText = editInput.value;
                        this.toggleElementVisibility(contentText, editInput);
                        if (typeof this.onTaskEdited === 'function') {
                            this.onTaskEdited(Number(item.getAttribute('data-id')), editInput.value);
                        }
                    }
                });

                editInput.addEventListener('blur', () => {
                    this.toggleElementVisibility(contentText, editInput);
                });
            });
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

    handleTaskDoubleClick = (taskId: number): void => {
        const content = this.taskList.querySelector(`.editable-content[data-task-id="${taskId}"]`);
        const contentText = content?.querySelector('.task-content') as HTMLElement;
        const editInput = content?.querySelector('.input-edit') as HTMLInputElement;

        if (content && contentText && editInput) {
            this.toggleElementVisibility(editInput, contentText);
            editInput.value = contentText.innerText;
            editInput.focus();
        }
    };

    toggleConfirmDialog = (show: boolean): void => {
        if (show) {
            this.confirmDialog.style.display = "block";
            this.overlay.style.display = "block";
        } else {
            this.confirmDialog.style.display = "none";
            this.overlay.style.display = "none";
        }
    };

    handleConfirmYes = (): void => {
        if (this.currentTaskId !== null) {
            this.onTaskClosed(this.currentTaskId);
            this.toggleConfirmDialog(false);
            this.currentTaskId = null;
        }
    };

    toggleElementVisibility = (elementToShow: HTMLElement, elementToHide: HTMLElement): void => {
        elementToShow.style.display = 'block';
        elementToHide.style.display = 'none';
    };

    handleConfirmCancel = (): void => {
        this.toggleConfirmDialog(false);
        this.currentTaskId = null;
    };

    showConfirmDialog = (): void => {
        this.toggleConfirmDialog(true);
    };

    hideConfirmDialog = (): void => {
        this.toggleConfirmDialog(false);
    };

    setTaskAddedHandler = (callback: (task: string) => void): void => {
        this.onTaskAdded = callback;
    };

    setTaskClosedHandler = (callback: (taskId: number) => void): void => {
        this.onTaskClosed = callback;
    };

    setTaskEditedHandler = (callback: (taskId: number, newContent: string) => void): void => {
        this.onTaskEdited = callback;
    };
}

export default TaskView;
