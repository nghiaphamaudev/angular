import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../../types/products';
import { formProduct } from '../../types/formProduct';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //instance
  http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/v1/products';

  getAllProducts(page: number) {
    return this.http.get<Iproduct[]>(`${this.apiUrl}?page=${page}`);
  }

  addProduct(data: formProduct) {
    return this.http.post(this.apiUrl, data);
  }

  getProductById(Id: string) {
    return this.http.get<Iproduct>(`${this.apiUrl}/${Id}`);
  }

  getProductByKeySearch(keySearch: string) {
    return this.http.get<Iproduct>(
      `${this.apiUrl}/search?keySearch=${keySearch}`
    );
  }

  deleteProduct(Id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${Id}`);
  }

  updateProduct(id: string, data: formProduct) {
    return this.http.patch(`${this.apiUrl}/${id}`, data);
  }
}
