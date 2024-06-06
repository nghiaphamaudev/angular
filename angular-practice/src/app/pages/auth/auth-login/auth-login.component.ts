import { response } from 'express';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, ToastModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.css',
  providers: [MessageService],
})
export class AuthLoginComponent {
  constructor(
    private userService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmitForm() {
    this.userService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        localStorage.setItem(
          'accessToken',
          JSON.stringify(response.accessToken)
        );
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login is successfully',
        });
        setTimeout(() => {
          this.router.navigate(['/admin/products/list']);
        }, 3000);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message}`,
        });
      },
    });
  }
}
