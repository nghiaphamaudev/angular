import { DetailPageComponent } from './pages/public/detail-page/detail-page.component';
import { HomePageComponent } from './pages/public/home-page/home-page.component';
import { ErrorPageComponent } from './pages/admin/error-page/error-page.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { ProductListComponent } from './pages/admin/product-list/product-list.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { ProductAddComponent } from './pages/admin/product-add/product-add.component';
import { ProductUpdateComponent } from './pages/admin/product-update/product-update.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'products/list',
        component: ProductListComponent,
      },
      {
        path: 'products/add',
        component: ProductAddComponent,
      },
      {
        path: 'products/edit/:id',
        component: ProductUpdateComponent,
      },
    ],
  },
  // {
  //   path: '**',
  //   component: ErrorPageComponent,
  // },
  // {
  //   path: 'page-not-found',
  //   component: ErrorPageComponent,
  // },
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: 'products/list',
        component: HomePageComponent,
      },
      {
        path: '',
        redirectTo: 'products/list',
        pathMatch: 'full',
      },
      {
        path: 'products/:id',
        component: DetailPageComponent,
      },
    ],
  },
];
