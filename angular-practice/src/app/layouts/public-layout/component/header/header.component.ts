import { AuthService } from './../../../../services/auth.service';

import { NgFor, NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../../../types/user';
import { response } from 'express';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    NgFor,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    NgFor,
    NgClass,
    RouterModule,
    NgIf,
    ToastModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [MessageService],
})
export class HeaderComponent {
  authService = inject(AuthService);
  inforUser!: any;
  currentUser: any = null;
  messageService = inject(MessageService);
  checkLocal() {
    const userData = localStorage.getItem('currentUser');

    if (userData) {
      this.currentUser = JSON.parse(userData);
      console.log(this.currentUser);
      this.inforUser = this.currentUser;
    } else {
      this.inforUser = null;
    }
  }
  ngOnInit(): void {
    this.checkLocal();
  }
  Logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Log out is successfully!',
    });
    this.checkLocal();
  }
}
