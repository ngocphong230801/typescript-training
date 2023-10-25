export const Notify = {
    All: "all",
    ACTIVE: "active",
    COMPLETED: "completed",
    ADD: "add",
    CLEAR: "clear",
    REMOVE: "remove",
    TOGGLE_ACTIVE: "toggle-active",
    TOGGLE_UN_ACTIVE: "toggle-unactive",
    TOGGLE_ACTIVE_ALL: "toggle-active-all",
    TOGGLE_UN_ACTIVE_ALL: "toggle-unactive-all",
    EDIT: "edit",
};

export const messageNotify: {
    [x: string]: {
        type: string;
        message: string;
    };
} = {
    [Notify.All]: {
        type: Notify.All,
        message: "Your action has been executed! The active tasks are showing.",
    },
    [Notify.ACTIVE]: {
        type: Notify.ACTIVE,
        message: "Your action has been executed! The active tasks are showing.",
    },
    [Notify.COMPLETED]: {
        type: Notify.COMPLETED,
        message:
            "Your action has been executed! The completed tasks are showing.",
    },
    [Notify.CLEAR]: {
        type: Notify.CLEAR,
        message:
            "Your action has been executed! All of the completed tasks were cleared.",
    },
    [Notify.ADD]: {
        type: Notify.ADD,
        message:
            "Your action has been executed! A task was added successfully.",
    },
    [Notify.REMOVE]: {
        type: Notify.REMOVE,
        message:
            "Your action has been executed! A task was removed successfully.",
    },
    [Notify.TOGGLE_ACTIVE]: {
        type: Notify.TOGGLE_ACTIVE,
        message:
            "Your action has been executed! A task was checked done successfully.",
    },
    [Notify. TOGGLE_UN_ACTIVE]: {
        type: Notify. TOGGLE_UN_ACTIVE,
        message:
            "Your action has been executed! A task was unchecked done successfully.",
    },
    [Notify.TOGGLE_ACTIVE_ALL]: {
        type: Notify.TOGGLE_ACTIVE_ALL,
        message:
            "Your action has been executed! All of the tasks are checked as completed.",
    },
    [Notify.TOGGLE_UN_ACTIVE_ALL]: {
        type: Notify.TOGGLE_UN_ACTIVE_ALL,
        message:
            "Your action has been executed! All of the tasks are unchecked as completed.",
    },
    [Notify.EDIT]: {
        type: Notify.EDIT,
        message:
            "Your action has been executed! A task was updated successfully.",
    },
};
