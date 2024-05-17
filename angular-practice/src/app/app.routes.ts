import { ErrorPageComponent } from './pages/admin/error-page/error-page.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductDetailComponent } from './pages/admin/product-detail/product-detail.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,

    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
      },
    ],
  },
  {
    path: '**',
    component: ErrorPageComponent,
  },
];
