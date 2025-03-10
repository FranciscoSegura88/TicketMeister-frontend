import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string; // Cambiado de 'email' a 'username' según las instrucciones
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  // Método para registrar un usuario
  register(userData: RegisterData): Observable<any> {
    // Validar el nombre de usuario
    if (!this.validateUsername(userData.username)) {
      return throwError(() => new Error('El nombre de usuario no cumple con el formato requerido.'));
    }

    // Validar la contraseña
    if (!this.validatePassword(userData.password)) {
      return throwError(() => new Error('La contraseña no cumple con los requisitos.'));
    }

    // Llamada al backend
    return this.http.post(`${this.API_URL}/register`, userData);
  }

  // Método para iniciar sesión
  login(credentials: LoginData): Observable<any> {
    // Validar el nombre de usuario
    if (!this.validateUsername(credentials.email)) {
      return throwError(() => new Error('El nombre de usuario no cumple con el formato requerido.'));
    }

    // Validar la contraseña
    if (!this.validatePassword(credentials.password)) {
      return throwError(() => new Error('La contraseña no cumple con los requisitos.'));
    }

    // Llamada al backend
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  // Validación del nombre de usuario (CURP mejorado)
  validateUsername(username: string): boolean {
    // Expresión regular para validar el formato del CURP mejorado
    const usernameRegex = /^[A-Z]{4}[0-9]{6}[A-Z]{1}[A-Z]{2}[A-Z0-9]{3}[A-Z]{2}[0-9]{1}$/;

    // Verificar la longitud exacta de 20 caracteres
    if (username.length !== 18) {
      return false;
    }

    // Verificar que no haya espacios
    if (/\s/.test(username)) {
      return false;
    }

    // Verificar que no empiece ni termine con caracteres especiales
    if (!/^[A-Z0-9]/.test(username) || !/[A-Z0-9]$/.test(username)) {
      return false;
    }

    // Verificar el formato con la expresión regular
    return usernameRegex.test(username);
  }

  // Validación de la contraseña
  validatePassword(password: string): boolean {
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&])[A-Za-z\d@#$%&]{8}$/;

    // Verificar la longitud exacta de 8 caracteres
    if (password.length < 8) {
      return false;
    }

    // Verificar el formato con la expresión regular
    return passwordRegex.test(password);
  }
}
