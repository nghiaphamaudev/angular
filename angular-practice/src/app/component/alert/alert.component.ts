import { Component, Input } from '@angular/core';
import { DetailToast, Toast } from '../../../types/toast';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'], // Corrected: styleUrls
})
export class AlertComponent {
  toastDetails: DetailToast = {
    timer: 5000,
    success: {
      icon: 'fa-circle-check',
      message: 'Success: This is a success toast.',
    },
    error: {
      icon: 'fa-circle-xmark',
      message: 'Error: This is an error toast.',
    },
  };
  icon: string = '';
  message: string = '';

  constructor() {}

  ngOnInit(): void {}

  removeToast(toast: HTMLElement) {
    toast.classList.add('hide');
    if ((toast as any).timeoutId) clearTimeout((toast as any).timeoutId);
    setTimeout(() => toast.remove(), 500);
  }

  showToast(type: string, message: string) {
    if (type === 'success') {
      this.icon = 'fa-circle-check';
      this.message = message;
    }
    const toast = document.createElement('li');
    toast.className = `toast ${type}`;

    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${this.icon}"></i>
                         <span>${this.message}</span>
                      </div>
                      <i class="fa-solid fa-xmark"></i>`;
    const notifications = document.querySelector('.notifications');
    notifications?.appendChild(toast);
    (toast as any).timeoutId = setTimeout(
      () => this.removeToast(toast),
      this.toastDetails.timer
    );
  }
}
