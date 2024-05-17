import { ProductService } from './../../../services/product.service';
import { Iproduct } from './../../../../types/products';
import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  //initial array
  products: Iproduct[] = [];
  productService = inject(ProductService);
  //instance

  listProduct: Iproduct[] = [];

  ishowImgae: Boolean = true;
  toggleImage = () => {
    this.ishowImgae = !this.ishowImgae;
  };

  loadProducts() {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        if (response && response.status === 'success' && response.products) {
          this.products = response.products;
          this.listProduct = [...this.products];
        } else {
          console.error('Invalid response from API:', response);
        }
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }


  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDeleteProduct = (productId: string) => {
    const message = confirm('Bạn có chắc không??');
    console.log(productId);
    if (message) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          alert('The product is deleted successfully!!');
          this.loadProducts();
        },
        (error) => {
          console.log('The delete failed: ', error);
        }
      );
    }
  };

  ngDoCheck() {
    console.log(this.products);
  }
  filterValue: string = '';
  filter() {
    this.products = this.listProduct.filter((product) =>
      product.productName.toLowerCase().includes(this.filterValue.toLowerCase())
    );
  }
}
