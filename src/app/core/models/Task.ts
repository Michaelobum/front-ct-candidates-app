export interface Task {
    id?: number;
    name: string;
    order: string;
    active: boolean;
    status: TaskStatus;
}
export enum TaskStatus {
    PENDING = "pending",
    COMPLETED = "completed"
}