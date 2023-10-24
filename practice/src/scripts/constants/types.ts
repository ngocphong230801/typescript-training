export type Task = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    isCompleted: boolean;
};

export type Notify =
    | "all"
    | "active"
    | "completed"
    | "add"
    | "clear"
    | "remove"
    | "toggle-active"
    | "toggle-unactive"
    | "toggle-active-all"
    | "toggle-unactive-all"
    | "edit";
