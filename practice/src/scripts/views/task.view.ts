import { querySelector } from "../helpers/dom-element";

class TaskView {
    private loadingElement: HTMLElement | null;

    constructor() {
        window.addEventListener("load", async () => {
            this.loadingElement = querySelector(".app__loading") as HTMLElement ;

            await new Promise((resolve) => setTimeout(resolve, 1000));

            if (this.loadingElement) {
                this.loadingElement.style.display = "none";
            } else {
                console.error("Loading element not found");
            }
        });
    }
}

export default TaskView;
