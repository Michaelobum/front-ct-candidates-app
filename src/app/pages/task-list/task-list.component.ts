import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../core/services/task.service";
import { Task, TaskStatus } from "../../core/models/Task";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./task-list.component.html",
  styles: [".task_completed { text-decoration: line-through; }"],
})
export class TaskListComponent implements OnInit {
  private tasks: Task[] = new Array<Task>();
  taskForm: FormGroup = new FormGroup({});

  constructor(private taskService: TaskService) {
    this.taskService.getAll().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      inputName: new FormControl(""),
    });
  }

  deleteAllTasks() {
    this.tasks = [];
  }

  isTaskStatusCompleted(taskStatus: TaskStatus): boolean {
    return taskStatus === TaskStatus.COMPLETED;
  }
  
  toggleTaskStatus(task: Task) {
    const newStatus = this.isTaskStatusCompleted(task.status)
      ? TaskStatus.PENDING
      : TaskStatus.COMPLETED;
  
    const updatedTask: Task = { ...task, status: newStatus };
    console.log(updatedTask,'updatedTask');
    this.taskService.update(updatedTask).subscribe({
      next: () => {
        this.tasks = this.tasks.map((editTask) =>
          editTask.id === updatedTask.id ? updatedTask : editTask
        );
        console.log(updatedTask);
      },
      error: (error) => {
        console.error('Error updating task status:', error);
      }
    });
  }
  
  getTaskStatus(status: TaskStatus): TaskStatus {
    return this.isTaskStatusCompleted(status)
      ? TaskStatus.PENDING
      : TaskStatus.COMPLETED;
  }
  

  deleteTask(task: Task) {
    this.taskService.deleteById(task.id!).subscribe();
  }

  addTask() {
    const task: Task = {
      name: this.inputName.value,
      status: TaskStatus.PENDING,
      active: true,
    };


    this.taskService.create(task).subscribe((createdTask) => {
      this.tasks.push(createdTask);
      this.inputName.setValue("");
    });
  }

  get inputName() {
    return this.taskForm.get("inputName") as FormControl;
  }

  get allTasks(): Task[] {
    return this.tasks.filter((task) => task.active);
  }
}

