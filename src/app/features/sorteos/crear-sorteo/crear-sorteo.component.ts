import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SorteoService } from '../../../core/services/sorteo.service';
import { Sorteo } from '../../../core/models/sorteo.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-sorteo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './crear-sorteo.component.html',
  styleUrl: './crear-sorteo.component.css'
})
export class CrearSorteoComponent {
  private fb = inject(FormBuilder);
  private sorteoService = inject(SorteoService);
  private router = inject(Router);

  public sorteoForm!: FormGroup;
  public registroExitoso: boolean = false;
  public errorRegistro: string | null = null;
  public cargando: boolean = false;

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  inicializarFormulario(): void {
    this.sorteoForm = this.fb.group({
      nombreSorteo: ['', [Validators.required, Validators.minLength(5)]],
      fechaSorteo: ['', [Validators.required]] 
    });
  }

  onSubmit(): void {
    this.registroExitoso = false;
    this.errorRegistro = null;

    if (this.sorteoForm.invalid) {
      this.sorteoForm.markAllAsTouched();
      return;
    }

    this.cargando = true;

    const nuevoSorteo: Partial<Sorteo> = this.sorteoForm.value;

    this.sorteoService.crearSorteo(nuevoSorteo).subscribe({
      next: () => {
        this.registroExitoso = true;
        this.cargando = false;
        this.sorteoForm.reset();
        
        setTimeout(() => this.router.navigate(['/sorteos']), 2000); 
      },
      error: (err) => {
        this.errorRegistro = err.error?.message || 'Error al crear el sorteo.';
        this.cargando = false;
      }
    });
  }
  
  get formControls() {
    return this.sorteoForm.controls;
  }
}
