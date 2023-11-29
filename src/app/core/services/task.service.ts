import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from "../models/Task";
import { Observable } from "rxjs";
import { catchError, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TaskService  {
    private apiUrl = 'http://localhost:8000/api/tasks';
    constructor(private http: HttpClient) {}
    getById(id: number) {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
      } 
      create(task: Task) {
        return this.http.post<Task>(`${this.apiUrl}`, task);
      }
    
      update(task: Task) {
        return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
      }
    
      deleteById(id: number) {
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
    getTasks(completed?: boolean, sortField?: string, sortOrder?: string): Observable<any[]> {
        let params = new HttpParams();
    
        if (completed !== undefined) {
          params = params.set('completed', completed.toString());
        }
    
        if (sortField) {
          params = params.set('sort_field', sortField);
        }
    
        if (sortOrder) {
          params = params.set('sort_order', sortOrder);
        }
    
        return this.http.get<any[]>(this.apiUrl, { params });
      }
}
