export const Notify = {
    all: "all",
    active: "active",
    completed: "completed",
    add: "add",
    clear: "clear",
    remove: "remove",
    toggle_active: "toggle-active",
    toggle_unactive: "toggle-unactive",
    toggle_active_all: "toggle-active-all",
    toggle_unactive_all: "toggle-unactive-all",
    edit: "edit",
};

export const messageNotify: {
    [x: string]: {
        type: string;
        message: string;
    };
} = {
    [Notify.all]: {
        type: Notify.all,
        message: "Your action has been executed! The active tasks are showing.",
    },
    [Notify.active]: {
        type: Notify.active,
        message: "Your action has been executed! The active tasks are showing.",
    },
    [Notify.completed]: {
        type: Notify.completed,
        message:
            "Your action has been executed! The completed tasks are showing.",
    },
    [Notify.clear]: {
        type: Notify.clear,
        message:
            "Your action has been executed! All of the completed tasks were cleared.",
    },
    [Notify.add]: {
        type: Notify.add,
        message:
            "Your action has been executed! A task was added successfully.",
    },
    [Notify.remove]: {
        type: Notify.remove,
        message:
            "Your action has been executed! A task was removed successfully.",
    },
    [Notify.toggle_active]: {
        type: Notify.toggle_active,
        message:
            "Your action has been executed! A task was checked done successfully.",
    },
    [Notify.toggle_unactive]: {
        type: Notify.toggle_unactive,
        message:
            "Your action has been executed! A task was unchecked done successfully.",
    },
    [Notify.toggle_active_all]: {
        type: Notify.toggle_active_all,
        message:
            "Your action has been executed! All of the tasks are checked as completed.",
    },
    [Notify.toggle_unactive_all]: {
        type: Notify.toggle_unactive_all,
        message:
            "Your action has been executed! All of the tasks are unchecked as completed.",
    },
    [Notify.edit]: {
        type: Notify.edit,
        message:
            "Your action has been executed! A task was updated successfully.",
    },
};
