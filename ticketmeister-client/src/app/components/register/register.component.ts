import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    const userData = { name: this.name, email: this.email, password: this.password };

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']); // Redirige al login
      },
      error: (error) => {
        console.error('Error al registrarse', error);
        alert('Error al registrarse'); // Muestra un mensaje de error
      }
    });
  }
}