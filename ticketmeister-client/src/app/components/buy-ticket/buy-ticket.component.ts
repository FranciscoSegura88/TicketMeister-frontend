import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService, Event } from '../../services/event.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  event: Event | undefined;

  // Datos del formulario
  formData = {
    nombre: '',
    apellidos: '',
    correo: '',
    telefono: '',
    cantidad: 1
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.loadEventDetails(+eventId);
    }
  }

  loadEventDetails(eventId: number): void {
    this.eventService.getEventById(eventId).subscribe({
      next: (data) => {
        this.event = data;
      },
      error: (error) => {
        console.error('Error al cargar los detalles del evento', error);
      }
    });
  }

  onSubmit(): void {
    if (!this.event) return;

    // Datos a enviar al backend y a la página de agradecimiento
    const payload = {
      nombre: this.formData.nombre,
      apellidos: this.formData.apellidos,
      correo: this.formData.correo,
      telefono: this.formData.telefono,
      cantidad: this.formData.cantidad,
      evento: this.event.title,
      posterUrl: this.event.posterUrl,
      theater: this.event.theater,
      city: this.event.city,
      state: this.event.state,
      country: this.event.country
    };

    // Enviar los datos al backend
    this.http.post('http://localhost:3000/send-email', payload).subscribe({
      next: (response: any) => {
        // Redirige a la página de agradecimiento
        this.router.navigate(['/thank-you'], {
          queryParams: { ...payload, event: JSON.stringify(this.event) }
        });
      },
      error: (error) => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar el correo. Inténtalo de nuevo.');
      }
    });
  }

  increment(): void {
    this.formData.cantidad++;
  }

  decrement(): void {
    if (this.formData.cantidad > 1) {
      this.formData.cantidad--;
    }
  }

}
