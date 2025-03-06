import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  username: string;
  email: string;
  password: string;

}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  register(userData: RegisterData): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  login(credentials: LoginData): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }
}
