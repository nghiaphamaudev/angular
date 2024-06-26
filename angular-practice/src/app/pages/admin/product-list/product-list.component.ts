import { ProductService } from './../../../services/product.service';
import { Iproduct } from './../../../../types/products';
import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterModule, ToastModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [MessageService],
})
export class ProductListComponent {
  //initial array
  products: Iproduct[] = [];
  productService = inject(ProductService);
  messageService = inject(MessageService);
  //instance

  listProduct: Iproduct[] = [];
  route = inject(ActivatedRoute);

  ishowImgae: Boolean = true;
  toggleImage = () => {
    this.ishowImgae = !this.ishowImgae;
  };

  loadProducts(page: number) {
    this.productService.getAllProducts(page).subscribe({
      next: (response: any) => {
        this.products = response.products;
        this.listProduct = [...this.products];
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loadProducts(params['page']);
    });
  }

  ngOnDeleteProduct = (productId: string) => {
    const message = confirm('Bạn có chắc không??');
    if (message) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.products = this.products.filter(
            (product) => product._id !== productId
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Delete product is successfully!',
          });
        },
        error: (error) => {
          console.log(error.message);
        },
      });
    }
  };

  filterValue: string = '';
  filter() {
    this.products = this.listProduct.filter((product) =>
      product.productName.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
}
