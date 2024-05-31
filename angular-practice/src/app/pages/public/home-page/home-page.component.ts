import {
  RouterOutlet,
  RouterModule,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ProductService } from './../../../services/product.service';
import { Component, inject } from '@angular/core';
import { Iproduct } from '../../../../types/products';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, NgClass, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  products!: Iproduct[];
  productService = inject(ProductService);
  listProducts!: Iproduct[];
  totalPage: number[] = [];
  currentPage!: number;
  route = inject(ActivatedRoute);
  router = inject(Router);

  loadProducts(page: number) {
    this.productService.getAllProducts(page).subscribe({
      next: (response: any) => {
        this.products = response.products;
        this.listProducts = [...this.products];
        this.currentPage = response.currentPage;
        this.totalPage = [];
        for (let i = 1; i <= response.countPages; i++) {
          this.totalPage.push(i);
        }
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
  getPageUrlTo(page: number) {
    this.router.navigate(['/products/list'], { queryParams: { page: page } });
  }

  getPageUrlPrev() {
    if (this.currentPage * 1 === 1) {
      this.router.navigate(['/products/list'], {
        queryParams: { page: this.currentPage },
      });
    } else {
      this.router.navigate(['/products/list'], {
        queryParams: { page: this.currentPage - 1 },
      });
    }
  }
  getPageUrlNext() {
    if (this.currentPage * 1 === this.totalPage.length) {
      this.router.navigate(['/products/list'], {
        queryParams: { page: this.currentPage },
      });
    } else {
      this.router.navigate(['/products/list'], {
        queryParams: { page: this.currentPage + 1 },
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.loadProducts(params['page'] * 1);
    });
  }

  toggleHeart(product: any) {
    product.liked = !product.liked;
  }
}
