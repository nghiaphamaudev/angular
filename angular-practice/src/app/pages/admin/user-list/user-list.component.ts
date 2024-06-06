import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { User } from '../../../../types/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NgFor, ToastModule, FormsModule, NgIf],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  providers: [MessageService],
})
export class UserListComponent {
  authService = inject(AuthService);
  listUser!: User[];
  users!: User[];
  idUser!: string;
  currentData!: any;

  messageService = inject(MessageService);
  loadUsers() {
    this.currentData = localStorage.getItem('currentUser');
    const email = JSON.parse(this.currentData).email;

    this.authService.getAllUser().subscribe({
      next: (response: any) => {
        this.listUser = [];
        this.listUser = [...response.data];
        this.listUser = this.listUser.filter((user) => user.email !== email);
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  ngOnInit() {
    this.loadUsers();
  }

  ngOnDeleteUser(id: string) {
    const message = confirm('Are you sure ?');
    if (message) {
      console.log(id);
      this.authService.deleteUser(id).subscribe({
        next: () => {
          this.listUser = this.listUser.filter((user) => user._id !== id);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Delete user is successfully!',
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${error.message}`,
          });
        },
      });
    }
  }
}
