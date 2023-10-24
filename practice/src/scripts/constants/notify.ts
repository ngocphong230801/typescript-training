import { Notify } from "./types";

export const messageNotify: Array<{
    type: Notify;
    message: string;
}> = [
    {
        type: "all",
        message: "Your action has been executed! The active tasks are showing.",
    },
    {
        type: "active",
        message: "Your action has been executed! The active tasks are showing.",
    },
    {
        type: "completed",
        message:
            "Your action has been executed! The completed tasks are showing.",
    },
    {
        type: "clear",
        message:
            "Your action has been executed! All of the completed tasks were cleared.",
    },
    {
        type: "add",
        message:
            "Your action has been executed! A task was added successfully.",
    },
    {
        type: "remove",
        message:
            "Your action has been executed! A task was removed successfully.",
    },
    {
        type: "toggle-active",
        message:
            "Your action has been executed! A task was checked done successfully.",
    },
    {
        type: "toggle-unactive",
        message:
            "Your action has been executed! A task was unchecked done successfully.",
    },
    {
        type: "toggle-active-all",
        message:
            "Your action has been executed! All of the tasks are checked as completed.",
    },
    {
        type: "toggle-unactive-all",
        message:
            "Your action has been executed! All of the tasks are unchecked as completed.",
    },
    {
        type: "edit",
        message:
            "Your action has been executed! A task was updated successfully.",
    },
];
