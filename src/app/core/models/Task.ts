export interface Task {
    id: number;
    name: string;
    description: string;
    status: TaskStatus;
}
export enum TaskStatus {
    PENDING = "Pending",
    COMPLETED = "completed"
}