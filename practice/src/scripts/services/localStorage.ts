import customErrorMessages from "../helpers/messages";
import { Task } from "../constants";

interface Storage {
    getTasks: () => Task[];
    saveTasks: (tasks: Task[]) => void;
}

const storage: Storage = {
    getTasks: () => {
        let tasks: Task[] = [];
        try {
            const dataStoraged = localStorage.getItem('tasks');
            tasks = dataStoraged ? JSON.parse(dataStoraged) : [];
        } catch (error) {
            customErrorMessages('getting tasks', error);
        }
        return tasks;
    },

    saveTasks: (tasks) => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            customErrorMessages('saving tasks', error);
        }
    }
};

export default storage;
