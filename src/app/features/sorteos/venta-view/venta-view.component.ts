import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common'; // Incluir Pipes
import { FormsModule } from '@angular/forms'; // Incluir FormsModule

import { SorteoService } from '../../../core/services/sorteo.service';
import { ClienteService } from '../../../core/services/cliente.service';
import { Sorteo } from '../../../core/models/sorteo.interface';
import { Cliente } from '../../../core/models/cliente.interface';
import { Billete } from '../../../core/models/billete.interface';
import { forkJoin } from 'rxjs'; // Para peticiones paralelas

@Component({
  selector: 'app-venta-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './venta-view.component.html',
  styleUrls: ['./venta-view.component.css']
})
export class VentaViewComponent {

  private sorteoService = inject(SorteoService);
  private clienteService = inject(ClienteService);

  public sorteos: Sorteo[] = [];
  public clientes: Cliente[] = [];

  public sorteoSeleccionado: Sorteo | null = null;
  public clienteSeleccionadoId: number | null = null;
  public billeteSeleccionadoId: number | null = null;
  
  public billetesDisponibles: Billete[] = [];
  public cargando: boolean = true;
  public error: string | null = null;
  public ventaMensaje: string | null = null;
  public procesandoVenta: boolean = false;

  ngOnInit(): void {
    this.cargarDatosIniciales();
  }
  
  cargarDatosIniciales(): void {
    this.cargando = true;
    this.error = null;

    forkJoin({
      sorteos: this.sorteoService.listarSorteos(),
      clientes: this.clienteService.listarClientes()
    }).subscribe({
      next: (data) => {
        this.sorteos = data.sorteos;
        this.clientes = data.clientes;
        this.cargando = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los datos: ' + (err.error?.message || 'Verifique el backend.');
        this.cargando = false;
      }
    });
  }

  onSorteoSeleccionado(sorteoId: number | null): void {
    if (!sorteoId) {
        this.sorteoSeleccionado = null;
        this.billetesDisponibles = [];
        this.billeteSeleccionadoId = null;
        return;
    }
    
    this.sorteoSeleccionado = this.sorteos.find(s => s.id === sorteoId) || null;
    
    if (this.sorteoSeleccionado) {
        this.billetesDisponibles = this.sorteoSeleccionado.billetes.filter(b => b.estado === 'DISPONIBLE');
    } else {
        this.billetesDisponibles = [];
    }
    this.billeteSeleccionadoId = null;
  }

  venderBillete(): void {
    this.ventaMensaje = null;

    if (!this.sorteoSeleccionado || !this.clienteSeleccionadoId || !this.billeteSeleccionadoId) {
      this.ventaMensaje = 'Debe seleccionar un sorteo, un cliente y un billete.';
      return;
    }

    const sorteoId = this.sorteoSeleccionado.id;
    const clienteId = this.clienteSeleccionadoId;
    const billeteId = this.billeteSeleccionadoId;

    this.procesandoVenta = true;

    this.sorteoService.venderBillete(sorteoId, clienteId, billeteId).subscribe({
      next: (billeteVendido: Billete) => {
        this.ventaMensaje = `¡Billete #${billeteVendido.numero} (Sorteo ${sorteoId}) vendido exitosamente!`;
        this.procesandoVenta = false;
        
        this.billetesDisponibles = this.billetesDisponibles.filter(b => b.id !== billeteId);
        this.billeteSeleccionadoId = null; 
      },
      error: (err) => {
        this.ventaMensaje = 'ERROR DE VENTA: ' + (err.error?.message || 'No se pudo completar la transaccion.');
        this.procesandoVenta = false;
      }
    });

    this.sorteoService.venderBillete(sorteoId, clienteId, billeteId).subscribe({
      next: (billeteVendido: Billete) => {
        this.ventaMensaje = `[OK] ¡Billete #${billeteVendido.numero} (Sorteo ${sorteoId}) vendido exitosamente!`; 
        this.procesandoVenta = false;
        
        // ...
      },
      error: (err) => {
        this.ventaMensaje = '[ERROR] DE VENTA: ' + (err.error?.message || 'No se pudo completar la transacción.');
        this.procesandoVenta = false;
      }
    });
  }
}
