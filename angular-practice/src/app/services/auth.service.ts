import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  private url: string = 'http://127.0.0.1:8000/api/v1/users';
  constructor() {}

  register(data: User) {
    return this.httpClient.post(`${this.url}/register`, data);
  }
  login(data: User) {
    return this.httpClient.post(`${this.url}/login`, data);
  }
  checkLoggedIn() {
    return this.httpClient.get(`${this.url}/checkLogged`);
  }
  getAllUser() {
    return this.httpClient.get<User[]>(this.url);
  }
  deleteUser(id: string) {
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }
}
