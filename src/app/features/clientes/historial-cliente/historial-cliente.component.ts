import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClienteService } from '../../../core/services/cliente.service';
import { BilleteService } from '../../../core/services/billete.service';
import { Cliente } from '../../../core/models/cliente.interface';
import { Billete } from '../../../core/models/billete.interface';

@Component({
  selector: 'app-historial-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './historial-cliente.component.html',
  styleUrl: './historial-cliente.component.css'
})
export class HistorialClienteComponent {

  private clienteService = inject(ClienteService);
  private billeteService = inject(BilleteService);

  public clientes: Cliente[] = [];
  public clienteSeleccionadoId: number | null = null;
  public historialBilletes: Billete[] = [];
  
  public cargandoClientes: boolean = true;
  public cargandoHistorial: boolean = false;
  public error: string | null = null;

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargandoClientes = true;
    this.error = null;
    
    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
        this.cargandoClientes = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la lista de clientes.';
        this.cargandoClientes = false;
      }
    });
  }

  consultarHistorial(): void {
    if (!this.clienteSeleccionadoId) {
      this.historialBilletes = [];
      return;
    }

    this.cargandoHistorial = true;
    this.error = null;

    this.billeteService.obtenerHistorialPorCliente(this.clienteSeleccionadoId).subscribe({
      next: (data) => {
        this.historialBilletes = data;
        this.cargandoHistorial = false;
      },
      error: (err) => {
        this.error = 'Error al consultar el historial: ' + (err.error?.message || 'Error de conexión.');
        this.cargandoHistorial = false;
        this.historialBilletes = [];
      }
    });
  }
}
