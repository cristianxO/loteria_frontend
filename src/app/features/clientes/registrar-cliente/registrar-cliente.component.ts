import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ClienteService } from '../../../core/services/cliente.service';
import { Cliente } from '../../../core/models/cliente.interface';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.css'
})
export class RegistrarClienteComponent {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);

  public clienteForm!: FormGroup;
  public registroExitoso: boolean = false;
  public errorRegistro: string | null = null;
  public cargando: boolean = false;

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.registroExitoso = false;
    this.errorRegistro = null;

    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched(); 
      return;
    }

    this.cargando = true;

    const nuevoCliente = this.clienteForm.value;

    this.clienteService.registrarCliente(nuevoCliente).subscribe({
      next: (clienteGuardado: Cliente) => {
        this.registroExitoso = true;
        this.cargando = false;
        this.clienteForm.reset();
        console.log('Cliente registrado con ID:', clienteGuardado.id);
      },
      error: (err) => {
        this.errorRegistro = err.error?.message || 'Error de conexion o en el servidor.';
        this.cargando = false;
      }
    });
  }
  
  get formControls() {
    return this.clienteForm.controls;
  }
}
