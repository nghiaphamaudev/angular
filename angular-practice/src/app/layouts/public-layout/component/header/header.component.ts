import { ProductService } from './../../../../services/product.service';
import { NgFor, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  keySearch!: string;
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  nameProduct!: string[];
  listNameProduct!: string[];

  loadNameProducts(page: number) {
    this.productService.getAllProducts(page).subscribe({
      next: (response: any) => {
        console.log(response.nameProduct);
        this.nameProduct = [];
        this.nameProduct = [...response.nameProduct];
        this.listNameProduct = [...response.nameProduct];
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }
  ngOnInit(page: number) {
    this.loadNameProducts(page);
  }

  getUrlKeySearch(e: Event) {
    e.preventDefault();
    console.log(this.keySearch);
    return this.router.navigate(['/products/search'], {
      queryParams: { keySearch: this.keySearch },
    });
  }
}
