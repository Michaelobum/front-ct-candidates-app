import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { AuthResponse } from "../models/response.interface";
import { AuthRequest } from "../models/Auth";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8000/api/';
    private readonly http: HttpClient = inject(HttpClient);
    constructor() {}
    loginByEmail(form: AuthRequest):Observable < AuthResponse > {   
        let url = `${this.apiUrl}login`;
        return this.http.post < AuthResponse > (url, form);
    }
    login(authRequest: AuthRequest) {
        return this.http.post(`${this.apiUrl}/login`, authRequest);
    }
    logout() {
        return this.http.post(`${this.apiUrl}/logout`, {});
    }
    register(authRequest: AuthRequest) {
        return this.http.post(`${this.apiUrl}/register`, authRequest);
    }
}