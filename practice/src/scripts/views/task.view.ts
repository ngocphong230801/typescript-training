import { getElementById, querySelector, querySelectorAll } from "../helpers/dom-element";

class TaskView {
    private taskList: HTMLElement;
    private taskInput: HTMLInputElement;
    private confirmDialog: HTMLElement;
    private confirmYesBtn: HTMLElement;
    private confirmCancelBtn: HTMLElement;
    private overlay: HTMLElement;
    private filter: NodeListOf<HTMLAnchorElement>;
    private totalItem: HTMLElement;
    private checkAllToggleItems: HTMLElement;
    private clearAllComplete: HTMLElement;
    private loadingElement: HTMLElement;
    private notificationDialog: HTMLElement;
    private notificationContent: HTMLElement;
    private closeNotificationBtn: HTMLElement;
    private taskStatusMap: Map<number, boolean>;
    private idTimerReload: number;
    private idTimer: number;
    private taskIndexToDelete: number | undefined;
    private taskIndexToEdit: number | undefined;

    constructor() {
        this.taskList = querySelector(".list-task") as HTMLElement;
        this.taskInput = getElementById("task-input") as HTMLInputElement;
        this.confirmDialog = getElementById("confirm-dialog") as HTMLElement;
        this.confirmYesBtn = getElementById("confirm-yes") as HTMLElement;
        this.confirmCancelBtn = getElementById("confirm-cancel") as HTMLElement;
        this.overlay = getElementById("overlay") as HTMLElement;
        this.filter = querySelectorAll(".task-filter-item > a") as NodeListOf<HTMLAnchorElement>;
        this.totalItem = querySelector(".total-item") as HTMLElement;
        this.checkAllToggleItems = querySelector(".check-all") as HTMLElement;
        this.clearAllComplete = querySelector(".clear-completed") as HTMLElement;
        this.loadingElement = querySelector(".app__loading") as HTMLElement;
        this.notificationDialog = getElementById("notification-dialog") as HTMLElement;
        this.notificationContent = querySelector(".notification-content") as HTMLElement;
        this.closeNotificationBtn = getElementById("close-notification") as HTMLElement;
        this.taskStatusMap = new Map<number, boolean>();
        
        window.addEventListener("load", async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.loadingElement.style.display = "none";
        });

    }
}

export default TaskView;
