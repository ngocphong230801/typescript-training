export const TYPES = {
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

const MESSAGES = {
    All : "Your action has been executed! The active tasks are showing",
    ACTIVE: "Your action has been executed! The active tasks are showing.",
    COMPLETED: "Your action has been executed! The completed tasks are showing",
    ADD: "Your action has been executed! A task was added successfully.",
    CLEAR: "Your action has been executed! All of the completed tasks were cleared.",
    REMOVE: "Your action has been executed! A task was removed successfully.",
    TOGGLE_ACTIVE: "Your action has been executed! A task was checked done successfully.",
    TOGGLE_UN_ACTIVE: "Your action has been executed! A task was unchecked done successfully.",
    TOGGLE_ACTIVE_ALL: "Your action has been executed! All of the tasks are checked as completed.",
    TOGGLE_UN_ACTIVE_ALL: "Your action has been executed! All of the tasks are unchecked as completed.",
    EDIT: "Your action has been executed! A task was updated successfully.",
}

export const messageNotify = {

    [TYPES.All]: {
        type: TYPES.All,
        message: MESSAGES.All
    },

    [TYPES.ACTIVE]: {
        type: TYPES.ACTIVE,
        message: MESSAGES.ACTIVE
    },

    [TYPES.COMPLETED]: {
        type: TYPES.COMPLETED,
        message: MESSAGES.COMPLETED
    },

    [TYPES.CLEAR]: {
        type: TYPES.CLEAR,
        message: MESSAGES.CLEAR
    },

    [TYPES.ADD]: {
        type: TYPES.ADD,
        message: MESSAGES.ADD
    },

    [TYPES.REMOVE]: {
        type: TYPES.REMOVE,
        message: MESSAGES.REMOVE
    },
    
    [TYPES.TOGGLE_ACTIVE]: {
        type: TYPES.TOGGLE_ACTIVE,
        message: MESSAGES.TOGGLE_ACTIVE
    },

    [TYPES. TOGGLE_UN_ACTIVE]: {
        type: TYPES. TOGGLE_UN_ACTIVE,
        message: MESSAGES.TOGGLE_ACTIVE
    },
    [TYPES.TOGGLE_ACTIVE_ALL]: {
        type: TYPES.TOGGLE_ACTIVE_ALL,
        message: MESSAGES.TOGGLE_ACTIVE_ALL
    },

    [TYPES.TOGGLE_UN_ACTIVE_ALL]: {
        type: TYPES.TOGGLE_UN_ACTIVE_ALL,
        message: MESSAGES.TOGGLE_UN_ACTIVE_ALL
    },

    [TYPES.EDIT]: {
        type: TYPES.EDIT,
        message:MESSAGES.EDIT
    }
};
