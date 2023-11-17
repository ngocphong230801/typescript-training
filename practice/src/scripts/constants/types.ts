export interface Task {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    isCompleted: boolean;
};

export enum TaskFilters {
    ALL_FILTER = "all",
    ACTIVE_FILTER = "active",
    COMPLETED_FILTER = "completed",
    UN_ACTIVE_FILTER = 'unactive',
    TOGGLE = 'toggle',
    COMPLETED_STATUS = '#completed',
    ACTIVE_STATUS = "#active"
}
