import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SorteoService } from '../../../core/services/sorteo.service';
import { Sorteo } from '../../../core/models/sorteo.interface';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lista-sorteos',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    RouterOutlet
],
  templateUrl: './lista-sorteos.component.html',
  styleUrl: './lista-sorteos.component.css'
})
export class ListaSorteosComponent {
  private sorteoService = inject(SorteoService);

  public sorteos: Sorteo[] = [];
  public cargando: boolean = true;
  public error: string | null = null;

  ngOnInit(): void {
    this.cargarSorteos();
  }

  cargarSorteos(): void {
    this.cargando = true;
    this.error = null;

    this.sorteoService.listarSorteos().subscribe({
      next: (data) => {
        this.sorteos = data;
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Error al cargar los sorteos.';
        this.cargando = false;
        console.error('Error al listar sorteos:', err);
      }
    });
  }

  contarBilletesDisponibles(sorteo: Sorteo): number {
    if (!sorteo.billetes) {
      return 0;
    }
    return sorteo.billetes.filter(billete => billete.estado === 'DISPONIBLE').length;
  }
}
