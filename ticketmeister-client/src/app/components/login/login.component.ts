import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credentials = { email: this.email, password: this.password };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Inicio de sesión exitoso', response);
        this.router.navigate(['/']); // Redirige al inicio
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas'); // Muestra un mensaje de error
      }
    });
  }
}