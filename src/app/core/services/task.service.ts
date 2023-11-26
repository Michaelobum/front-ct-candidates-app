// task.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Task } from "../models/Task";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:8000/api/tasks/';

    constructor(private http: HttpClient) {}

    create(task: Task): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    update(task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getPending(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/pending`);
    }

    getCompleted(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/completed`);
    }

    getAll(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }
}