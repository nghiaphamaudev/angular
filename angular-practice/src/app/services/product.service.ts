import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../../types/products';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //instance
  http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:8000/api/v1/products';

  getAllProducts() {
    return this.http.get<Iproduct[]>(this.apiUrl);
  }

  getProduct(Id: string) {
    return this.http.get<Iproduct>(`${this.apiUrl}/${Id}`);
  }

  deleteProduct(Id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${Id}`);
  }
}
