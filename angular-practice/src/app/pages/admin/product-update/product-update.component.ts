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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, ToastModule],
  templateUrl: './product-update.component.html',
  styleUrl: './product-update.component.css',
  providers: [MessageService],
})
export class ProductUpdateComponent {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  messageServie = inject(MessageService);
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
          this.messageServie.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Update product is successfully!',
          });
          setTimeout(() => {
            this.router.navigate(['/admin/products/list']);
          }, 3000);
        },
        error: (error) => {
          console.log(error);
          this.messageServie.add({
            severity: 'error',
            summary: 'Failed!',
            detail: `${error.message}`,
          });
        },
      });
  }
}
