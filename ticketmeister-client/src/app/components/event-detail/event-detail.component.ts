import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Importa Router
import { EventService, Event } from '../../services/event.service';
import * as L from 'leaflet';  // Importa Leaflet
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event: Event | undefined;
  errorMessage: string | undefined;
  private map: L.Map | undefined;  // Mapa de Leaflet

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router  // Inyecta Router
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
        this.errorMessage = undefined;
        this.initMap();  // Inicializa el mapa después de que el evento esté disponible
      },
      error: (error) => {
        console.error('Error al cargar los detalles del evento', error);
        this.errorMessage = 'No se pudo cargar la información del evento. Inténtalo de nuevo más tarde.';
      }
    });
  }

  // Navegar al componente de compra de boletos
  goToBuyTickets(): void {
    if (this.event) {
      this.router.navigate(['/buy-tickets', this.event.id]);  // Navega a la ruta de compra de boletos
    }
  }

  private initMap(): void {
    // Verifica si el contenedor del mapa existe
    const checkContainer = () => {
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        // Inicializa el mapa en el contenedor
        this.map = L.map('map').setView([0, 0], 2);  // Vista inicial

        // Añade una capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);

        // Actualiza el mapa con la ubicación del evento
        this.updateMap();
      } else {
        // Si el contenedor no está disponible, reintenta después de 100 ms
        setTimeout(checkContainer, 100);
      }
    };

    // Inicia la verificación del contenedor
    checkContainer();
  }

  private updateMap(): void {
    if (this.event && this.map) {
      this.getTheaterCoordinates(this.event.theater).then(coordinates => {
        this.map!.setView(coordinates, 15);  // Centra el mapa en la ubicación del teatro
        L.marker(coordinates).addTo(this.map!)
          .bindPopup(this.event!.theater)
          .openPopup();
      }).catch(error => {
        console.error('Error al obtener las coordenadas:', error);
        // Coordenadas por defecto (Ciudad de México)
        const defaultCoordinates: [number, number] = [19.4326, -99.1332];
        this.map!.setView(defaultCoordinates, 15);
        L.marker(defaultCoordinates).addTo(this.map!)
          .bindPopup(this.event!.theater)
          .openPopup();
      });
    }
  }

  private async getTheaterCoordinates(theaterName: string): Promise<[number, number]> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(theaterName)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];  // Devuelve las coordenadas
      } else {
        throw new Error('Ubicación no encontrada');
      }
    } catch (error) {
      console.error('Error al obtener las coordenadas:', error);
      throw error;  // Relanza el error para manejarlo en updateMap
    }
  }
}
