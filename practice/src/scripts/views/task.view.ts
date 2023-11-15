import { querySelector, getElementById, querySelectorAll , toggleDisplay} from "../helpers";
import { messageNotify, Task, keys, TYPES } from "../constants";
import TaskModel from "../models/task.model";

class TaskView {
    private taskModel: TaskModel;

    private Sort: NodeList;
    private loadingElement: HTMLElement | null;
    private taskList: HTMLElement;
    private taskInput: HTMLElement;
    private checkAllElement: HTMLElement;
    private navAction: HTMLElement;
    private totalElement: HTMLElement;
    private notificationDialog: HTMLDivElement;
    private notificationContent: HTMLElement;
    private closetypeCation: HTMLElement;
    private confirmDialog: HTMLElement;
    private overlay: HTMLElement;
    private currentTaskId: number | null = null;
    private onTaskAdded: (task: string) => void;
    private onTaskClosed: (taskId: number) => void;
    private onTaskEdited: (taskId: number, newContent: string) => void;
    private onToggleCompleted: (taskId: number, status: string) => void;
    private onTaskFilter: (action: string) => void;
    private onSetCheckAllToggleTask: () => void;
    private onClearCompleted: () => void;    
    private IDTimer: NodeJS.Timeout;
    private progessAlert: boolean = false;

    constructor(taskModel: TaskModel) {
        this.taskModel = taskModel;

        window.addEventListener("load", async () => {
            this.loadingElement = querySelector(".app__loading") as HTMLElement;

            await new Promise((resolve) => setTimeout(resolve, 1000));

            toggleDisplay(this.loadingElement, false);
            if (!this.loadingElement) {
                console.error("Loading element not found");
            }
        });

        this.taskList = querySelector(".list-of-tasks") as HTMLElement;
        this.taskInput = getElementById("task-input") as HTMLElement;
        this.handleTaskClose = this.handleTaskClose.bind(this);
        this.Sort = querySelectorAll(".task-filter-item > a");
        this.checkAllElement = querySelector(".check-all") as HTMLElement;
        this.totalElement = querySelector(".total-item") as HTMLElement;
        this.navAction = querySelector(".content-action") as HTMLElement;
        this.notificationDialog = querySelector("#notification-dialog") as HTMLDivElement;
        this.notificationContent = querySelector(".notification-content") as HTMLElement;

        this.confirmDialog = getElementById("confirm-dialog") as HTMLElement;
        this.overlay = getElementById("overlay") as HTMLElement;
        this.closetypeCation = querySelector("#close-notification") as HTMLElement;

        const confirmYesButton = getElementById("confirm-yes") as HTMLElement;
        const confirmCancelButton = getElementById("confirm-cancel") as HTMLElement;

        confirmYesButton.addEventListener("click", this.handleConfirmYes);
        confirmCancelButton.addEventListener("click", this.handleConfirmCancel);
        this.init();
    }

    init = (): void => {
        this.taskInput.addEventListener("keyup", this.handleTaskInput);
        this.taskList.addEventListener("click", this.handleContentDataClick);
        this.Sort.forEach((element) => {
            if (element instanceof HTMLElement) {
                element.addEventListener("click", () =>
                    this.handleFilerTask(element)
                );
            }
        });
        const clearCompletedButton = querySelector(".clear-completed") as HTMLElement;
        clearCompletedButton.addEventListener("click", this.handleClearCompleted);
        this.checkAllElement.addEventListener("click",this.handleToggleAllItems);
        this.closetypeCation.addEventListener("click", () => {
          toggleDisplay(this.notificationDialog, false)
        });
    };

    handleReloadWindows = (): void => {
        const status = window.location.hash;
        let elements: NodeList = querySelectorAll(".task-filter-item > a");

        elements.forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.classList.remove("active-btn");
                if (element.dataset.action === status.slice(1, status.length)) {
                        element.classList.add("active-btn");
                }
            }
        });
    };

    handleClearCompleted = (): void => {
        this.handleShowtype(messageNotify[TYPES.CLEAR].message);
        this.onClearCompleted();
        const clearCompletedButton = querySelector(".clear-completed") as HTMLElement;
        toggleDisplay(clearCompletedButton, false)
    };

    renderTasks = (tasks: Task[]): void => {
        if (!this.taskList) {
            console.error("Task list element not found");
            return;
        }

        const incompleteTasksCount = this.taskModel.getTasks("getall").filter((item: Task) => !item.isCompleted).length;
        const itemsText = incompleteTasksCount === 1 ? "item" : "items";
        this.totalElement.innerHTML = incompleteTasksCount > 1 ? `${incompleteTasksCount} ${itemsText} left` : `${incompleteTasksCount} item left`;
        this.taskList.innerHTML = tasks
            .map(({ id, content, createdAt, updatedAt, isCompleted }: { id: number; content: string; createdAt: string; updatedAt: string; isCompleted: boolean;}) =>  
                `<li data-id="${id}"  data-checked="${isCompleted ? "true" : "false"}" class="content-data">
                    <i class="fa fa-circle-o task-icon"></i>
                    <i class="fa fa-check-circle-o checkmark" style="display: ${isCompleted ? "block" : "none"}; width: 10px;"></i>
                    <div class="editable-content" data-task-id="${id}" data-content="${content}">
                        <p class="task-content" style="${isCompleted && "text-decoration: line-through; color: #a5a5a5"}">${content}</p>
                        <input type="text" class="edit-input" style="display: none">
                    </div>
                    <i class="fa fa-times close-task" data-task-id="${id}"></i>
                    <p class="task-timestamp">Update at: ${updatedAt} - Created at: ${createdAt}</p>  
                </li>`
            )
            .join("");

        if (this.taskModel.getTasks("getall").length === 0) {
            toggleDisplay(this.navAction, false)
        } else {
            this.navAction.style.display = "flex";
        }

        const closeIcons = this.taskList.querySelectorAll(".close-task");
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
                            this.handleShowtype(messageNotify[TYPES.EDIT].message
                            );
                        }
                    }
                });

                editInput.addEventListener('blur', () => {
                    this.toggleElementVisibility(contentText, editInput);
                });
            });
        });
    };

    handleToggleAllItems = (): void => {
        const checkAllChecked = this.taskModel
            .getTasks("getall")
            .find((item) => !item.isCompleted);

        if (checkAllChecked) {
            this.handleShowtype(
                messageNotify[TYPES.TOGGLE_ACTIVE_ALL].message
            );
        } else {
            this.handleShowtype(
                messageNotify[TYPES.TOGGLE_UN_ACTIVE_ALL].message
            );
        }

        this.onSetCheckAllToggleTask();
    };

    handleFilerTask(element: HTMLElement): void {
        const action = element.getAttribute("data-action");

        if (action !== "all") {
            this.handleShowtype(messageNotify[action].message, "filter");
        }

        if (action) {
            this.onTaskFilter(action);
            this.Sort.forEach((element) => {
                if (element instanceof HTMLElement) {
                    element.classList.remove("active-btn");
                }
            });
            element.classList.add("active-btn");
        }
    }

    handleContentDataClick = (event: MouseEvent): void => {
        const clickedElement = event.target as HTMLElement;

        if (clickedElement.classList.contains("task-icon")) {
            const taskDataId = parseInt(clickedElement.parentElement?.dataset.id);
            const currentStatus = clickedElement.parentElement?.dataset.checked;
            if (taskDataId || (taskDataId === 0 && currentStatus)) {
                const newStatus = currentStatus === "true" ? "unactive" : "active";
                clickedElement.classList.toggle("clicked");
                const checkmark = clickedElement.parentElement?.querySelector(".checkmark") as HTMLElement;
                const taskContentElement = clickedElement.parentElement?.querySelector(".task-content") as HTMLElement;

                if (checkmark && taskContentElement) {
                    if (newStatus === "active") {
                        taskContentElement.style.textDecoration = "line-through";
                        checkmark.style.display = "inline-block";
                        this.onToggleCompleted(taskDataId, "active");
                        this.handleShowtype(
                            messageNotify[TYPES.TOGGLE_ACTIVE].message
                        );
                    } else {
                        this.handleShowtype(
                            messageNotify[TYPES.TOGGLE_UN_ACTIVE].message
                        );
                        taskContentElement.style.textDecoration = "none";
                        toggleDisplay(checkmark, false)
                        this.onToggleCompleted(taskDataId, "unactive");
                    }
                }
            }
        }
    };

    handleTaskInput = (event: KeyboardEvent): void => {
        if (event.key === keys.ENTER) {
            const newTask = (event.target as HTMLInputElement).value.trim();
            (event.target as HTMLInputElement).value = "";
            if (newTask) {
                this.handleShowtype(messageNotify[TYPES.ADD].message);
                this.onTaskAdded(newTask);
            }
        }
    };

    handleShowtype = (message: string, type?: string): void => {
        if (type) {
            this.notificationDialog.style.color = "#004085";
            this.notificationDialog.style.backgroundColor = "#cce5ff";
            this.notificationDialog.style.border = `1px solid #004085`;
        } else {
            this.notificationDialog.style.color = "#155724";
            this.notificationDialog.style.backgroundColor = "#d4edda";
            this.notificationDialog.style.border = `1px solid #155724`;
        }

        toggleDisplay(this.notificationDialog, true)
        this.notificationContent.innerText = message;
        this.progessAlert = false;
        clearTimeout(this.IDTimer);
        this.IDTimer = setTimeout(() => {
            toggleDisplay(this.notificationDialog, false)
            this.progessAlert = true;
        }, 3000);
    };

    hideNotification = () : void => {
        if (this.progessAlert) {
            clearTimeout(this.IDTimer);
            toggleDisplay(this.notificationDialog, false)
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
           toggleDisplay(this.confirmDialog, true)
            toggleDisplay(this.overlay, true)
        } else {
            toggleDisplay(this.confirmDialog, false)
            toggleDisplay(this.overlay, false)
        }
    };

    handleConfirmYes = (): void => {
        if (this.currentTaskId !== null) {
            this.onTaskClosed(this.currentTaskId);
            this.toggleConfirmDialog(false);
            this.currentTaskId = null;
            this.handleShowtype(messageNotify[TYPES.REMOVE].message);
        }
    };

    toggleElementVisibility = (elementToShow: HTMLElement, elementToHide: HTMLElement): void => {
        elementToShow.style.display = 'block';
        elementToHide.style.display = 'none';
    };

    updateClearCompletedButtonVisibility(): void {
        const clearCompletedButton = querySelector(".clear-completed") as HTMLElement;
        const hasCompletedTasks = this.taskModel.hasCompletedTasks();
    
        if (clearCompletedButton) {
            clearCompletedButton.style.display = hasCompletedTasks ? "block" : "none";
        }
    }

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


    setToggleCompleted = (callback: (id: number, status: string) => void): void => {
        this.onToggleCompleted = callback;
    };

    setTaskFilter = (callback: (action: string) => void): void => {
        this.onTaskFilter = callback;
    };

    setCheckAllToggleTask = (callback: () => void): void => {
        this.onSetCheckAllToggleTask = callback;
    };

    setClearCompletedHandler = (callback: () => void): void => {
        this.onClearCompleted = callback;
    };
}

export default TaskView;
