export const NOTIFYS = {
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
    All_TASKS: "Your action has been executed! The active tasks are showing",
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

export const MESSAGESNOTIFY = {

    [NOTIFYS.All]: MESSAGES.All_TASKS,

    [NOTIFYS.ACTIVE]: MESSAGES.ACTIVE,

    [NOTIFYS.COMPLETED]: MESSAGES.COMPLETED,

    [NOTIFYS.CLEAR]: MESSAGES.CLEAR ,

    [NOTIFYS.ADD]: MESSAGES.ADD,

    [NOTIFYS.REMOVE]: MESSAGES.REMOVE,
    
    [NOTIFYS.TOGGLE_ACTIVE]: MESSAGES.TOGGLE_ACTIVE,

    [NOTIFYS. TOGGLE_UN_ACTIVE]: MESSAGES.TOGGLE_UN_ACTIVE,

    [NOTIFYS.TOGGLE_ACTIVE_ALL]: MESSAGES.TOGGLE_ACTIVE_ALL,

    [NOTIFYS.TOGGLE_UN_ACTIVE_ALL]: MESSAGES.TOGGLE_UN_ACTIVE_ALL,

    [NOTIFYS.EDIT]: MESSAGES.EDIT
};
