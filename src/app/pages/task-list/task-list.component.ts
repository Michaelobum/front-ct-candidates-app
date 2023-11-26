// task-list.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../core/models/Task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styles: [],
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
    this.taskService.getAll().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskToDelete: Task): void {
    this.taskService.delete(taskToDelete.id).subscribe(() => {
      // Realizar acciones adicionales después de eliminar la tarea
      console.log('Tarea eliminada:', taskToDelete);
      // Actualizar la lista de tareas después de eliminar
      this.tasks = this.tasks.filter(task => task.id !== taskToDelete.id);
    });
  }
  updateTask(taskToUpdate: Task): void {
    this.taskService.update(taskToUpdate).subscribe((task) => {
      // Realizar acciones adicionales después de actualizar la tarea
      console.log('Tarea actualizada:', task);
      // Actualizar la lista de tareas después de actualizar
      this.tasks = this.tasks.map(task => task.id === taskToUpdate.id ? taskToUpdate : task);
    });
  }

  get allTasks(): Task[] {
    return this.tasks;
  }
}
