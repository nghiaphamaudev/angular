import { DetailToast } from './../../../../types/toast';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../types/category';
import { AlertComponent } from '../../../component/alert/alert.component';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, AlertComponent],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  categoryName: Category[] = [];
  router = inject(Router);
  alert!: string;

  //lay gia tri cac bien

  addProductForm: FormGroup = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    imageUrl: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    showProduct: new FormControl('true', []),
  });

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe({
      next: (response: any) => {
        this.categoryName = [];
        this.categoryName = [...response.data];
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  handleSubmitForm() {
    console.log(this.addProductForm);
    this.productService.addProduct(this.addProductForm.value).subscribe({
      next: () => {
        alert('Tạo thành công !');
        this.router.navigate(['/admin/products/list']);
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  //Test
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
                      <i class="fa-solid fa-xmark" onclick="this.parentElement.remove()"></i>`;
    const notifications = document.querySelector('.notifications');
    notifications?.appendChild(toast);
    (toast as any).timeoutId = setTimeout(
      () => this.removeToast(toast),
      this.toastDetails.timer
    );
  }
}
