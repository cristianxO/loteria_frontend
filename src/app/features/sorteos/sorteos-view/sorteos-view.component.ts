import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaSorteosComponent } from '../lista-sorteos/lista-sorteos.component';
import { CrearSorteoComponent } from '../crear-sorteo/crear-sorteo.component';

@Component({
  selector: 'app-sorteos-view',
  standalone: true,
  imports: [
    CommonModule,
    ListaSorteosComponent,
    CrearSorteoComponent
  ],
  templateUrl: './sorteos-view.component.html',
  styleUrl: './sorteos-view.component.css'
})
export class SorteosViewComponent {

  public vistaActiva: 'lista' | 'crear' = 'lista';

  cambiarVista(vista: 'lista' | 'crear'): void {
    this.vistaActiva = vista;
  }
}
