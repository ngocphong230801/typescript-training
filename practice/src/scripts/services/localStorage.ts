import customErrorMessages from "../helpers/messages";
import { Task } from "../constants";

interface Storage {
    getTasks: () => Task[];
    saveTasks: (tasks: Task[]) => void;
}

let cachedTasks: Task[] | null = null;

const storage: Storage = {
    getTasks: () => {
        try {
            if (cachedTasks !== null) {
                return cachedTasks;
            }

            const tasksJSON = localStorage.getItem('tasks');
            const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];

            cachedTasks = tasks;

            return tasks;
        } catch (error) {
            customErrorMessages('getting tasks', error);
            return [];
        }
    },

    saveTasks: (tasks) => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            cachedTasks = tasks;
        } catch (error) {
            customErrorMessages('saving tasks', error);
        }
    }
};

export default storage;
