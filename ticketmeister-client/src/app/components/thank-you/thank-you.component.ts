import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-thank-you',
  imports: [RouterModule],
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent implements OnInit {
  event: any;
  nombre: string = '';
  apellidos: string = '';
  correo: string = '';
  cantidad: number = 0;
  telefono: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Obtén los datos de la compra desde los parámetros de la ruta
    this.route.queryParams.subscribe(params => {
      if (params['event']) {
        this.event = JSON.parse(params['event']);
      }
      this.nombre = params['nombre'];
      this.apellidos = params['apellidos'];
      this.correo = params['correo'];
      this.telefono = params['telefono'];
      this.cantidad = +params['cantidad'];
    });
  }
}
