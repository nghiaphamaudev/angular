import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../types/category';
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  //instance
  http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/v1/categories';

  getAllCategory() {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }
}
