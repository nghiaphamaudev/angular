import { NgIf, NgFor } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Iproduct } from '../../../../types/products';
import { formProduct } from '../../../../types/formProduct';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../types/category';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
})
export class ProductUpdateComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  productId!: string;
  product!: formProduct;
  categoryName: Category[] = [];
  alert!: string;

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
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.productService.getProductById(params['id']).subscribe({
        next: (response: any) => {
          this.addProductForm.patchValue(response.product);
        },
        error: (error) => {
          console.log(error);
        },
      });
    });

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
    this.productService
      .updateProduct(this.productId, this.addProductForm.value)
      .subscribe({
        next: () => {
          this.alert = `<div id="toast-success"
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert">
        <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">Item moved successfully.</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
        <span class="sr-only">Close</span>
        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
    </button>
    </div>`;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}