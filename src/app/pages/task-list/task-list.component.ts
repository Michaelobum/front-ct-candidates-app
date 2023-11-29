import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TaskService } from "../../core/services/task.service";
import { Task, TaskStatus } from "../../core/models/Task";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: "./task-list.component.html",
  styles: [".task_completed { text-decoration: line-through; }"],
})
export class TaskListComponent implements OnInit {
  private tasks: Task[] = new Array<Task>();
  taskForm: FormGroup = new FormGroup({});
  completedFilter: boolean = false;
  searchTerm: string = '';

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
    this.taskService.update(updatedTask).subscribe({
      next: () => {
        this.tasks = this.tasks.map((editTask) =>
          editTask.id === updatedTask.id ? updatedTask : editTask
        );
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
  confirmDeleteTask(task: Task): void {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la tarea "${task.name}"?`);
  
    if (confirmDelete) {
      this.deleteTask(task);
    }
  }
  
  
  
  
  deleteTask(task: Task) {
    this.taskService.deleteById(task.id!).subscribe({
      next: () => {
        console.log('Tarea eliminada con éxito');
        this.tasks = this.tasks.filter((editTask) => editTask.id !== task.id);

      },
      error: (error) => {
        console.error('Error al eliminar la tarea:', error);
      }
    });
  }

  addTask() {
    const task: Task = {
      name: this.inputName.value,
      order: this.orderTask.value,
      status: TaskStatus.PENDING,
      active: true,
    };


    this.taskService.create(task).subscribe((createdTask) => {
      this.tasks.push(createdTask);
      this.inputName.setValue("");
      this.orderTask.setValue("");
    });
  }

  get inputName() {
    return this.taskForm.get("inputName") as FormControl;
  }
  get orderTask(){
    return this.taskForm.get("orderTask") as FormControl;
  }

  get allTasks(): Task[] {
    return this.tasks.filter((task) => task.active);
  }
  applyFilter(): void {
    if (this.completedFilter) {
      this.tasks = this.tasks.filter((task) => task.status === TaskStatus.COMPLETED);
    } else {
      // Si no se quiere filtrar las tareas completadas, puedes cargar todas las tareas aquí.
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.taskService.getTasks(this.completedFilter, 'title', 'asc').subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  toggleCompletedFilter(event: Event) {
    this.completedFilter = (event.target as HTMLInputElement).checked;
    console.log('this.completedFilter', this.completedFilter);
    this.applyFilter();
  }
  
  filterTasks(): Task[] {
    return this.tasks.filter(task =>
      task.active && task.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  }


