class TaskView {
    
    private loadingElement: HTMLElement;

    constructor() {
        window.addEventListener("load", async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.loadingElement.style.display = "none";
        });

    }
}

export default TaskView;
