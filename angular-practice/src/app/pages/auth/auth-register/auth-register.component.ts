import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, ToastModule],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.css',
  providers: [MessageService],
})
export class AuthRegisterComponent {
  userService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordConfirm: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmitForm() {
    console.log(this.registerForm.value);
    this.userService.register(this.registerForm.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Register is successfylly!',
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `${error.error.message}`,
        });
      },
    });
  }
}
