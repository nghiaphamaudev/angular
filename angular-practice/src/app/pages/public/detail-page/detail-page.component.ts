import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Iproduct } from './../../../../types/products';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-detail-page',
  standalone: true,
  imports: [NgIf],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.css',
})
export class DetailPageComponent {
  product!: Iproduct;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  ngOnInit(): void {
    console.log(this.route.queryParams);
    if (this.route.params) {
      this.route.params.subscribe((param) => {
        this.productService.getProductById(param['id']).subscribe({
          next: (data: any) => {
            this.product = data.product;
            if (!this.product) this.router.navigate(['/page-not-found']);
          },
          error: (error) => {
            console.log(error.message);
            alert(error.message);
            this.router.navigate(['/page-not-found']);
          },
        });
      });
    } else {
      this.route.queryParams.subscribe((param) => {
        this.productService
          .getProductByKeySearch(param['keySearch'])
          .subscribe({
            next: (data: any) => {
              this.product = data.product;
            },
            error: (error) => {
              console.log(error);
            },
          });
      });
    }
  }
}
