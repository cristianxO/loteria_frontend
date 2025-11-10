import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarClienteComponent } from '../registrar-cliente/registrar-cliente.component';
import { HistorialClienteComponent } from '../historial-cliente/historial-cliente.component';

@Component({
  selector: 'app-clientes-view',
  standalone: true,
  imports: [
    CommonModule,
    RegistrarClienteComponent, 
    HistorialClienteComponent
  ],
  templateUrl: './clientes-view.component.html',
  styleUrl: './clientes-view.component.css'
})
export class ClientesViewComponent {

  public vistaActiva: 'registro' | 'historial' = 'registro';

  cambiarVista(vista: 'registro' | 'historial'): void {
    this.vistaActiva = vista;
  }
}
