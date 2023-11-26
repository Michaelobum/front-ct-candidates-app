import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from "../models/Auth";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8000/api/auth/';
    private readonly http: HttpClient = inject(HttpClient);
    constructor() {}
    login(authRequest: AuthRequest) {
        return this.http.post(`${this.apiUrl}/login`, authRequest);
    }
}