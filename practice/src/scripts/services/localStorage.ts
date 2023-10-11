import handleError from "../helpers/messages";
import { Task } from "./types";

interface Storage {
    getTasks: () => Task[];
    saveTasks: (tasks: Task[]) => void;
}

const storage: Storage = {
    getTasks: () => {
        try {
            const tasksJSON = localStorage.getItem('tasks');
            return tasksJSON ? JSON.parse(tasksJSON) : [];
        } catch (error) {
            handleError('getting tasks', error);
            return [];
        }
    },

    saveTasks: (tasks) => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            handleError('saving tasks', error);
        }
    }
};

export default storage;
