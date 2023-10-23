import TaskController from "./controllers/task.controler";
import TaskModel from "./models/task.model";
import TaskView from "./views/task.view";

// Define the App class.
export class App {
    // Method to start the application.
    startApp() {
        // Create instances of the TaskModel, TaskView, and TaskController.
        const taskModel = new TaskModel();
        const taskView = new TaskView(taskModel);
        const taskController = new TaskController(taskModel, taskView);

        // Initialize the TaskController.
        taskController.init();
    }
}
