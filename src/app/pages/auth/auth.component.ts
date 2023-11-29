import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthRequest } from '../../core/models/Auth';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styles: ``
})
export class AuthComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
    constructor(private auth:AuthService) { }
  
    ngOnInit(): void {
    }
    onLogin() {
      if (this.loginForm.valid) {
        const formValue = this.loginForm.value as AuthRequest; // Asegúrate de que el tipo sea AuthRequest
        this.auth.loginByEmail(formValue).subscribe(data => {
          console.log(data);
    });
    }
  }
}