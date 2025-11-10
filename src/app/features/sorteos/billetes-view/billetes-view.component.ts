import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { SorteoService } from '../../../core/services/sorteo.service';
import { BilleteService } from '../../../core/services/billete.service';
import { Sorteo } from '../../../core/models/sorteo.interface';
import { Billete } from '../../../core/models/billete.interface';

@Component({
  selector: 'app-billetes-view',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ], 
  templateUrl: './billetes-view.component.html', 
  styleUrls: ['./billetes-view.component.css']
})
export class BilletesViewComponent {
  
  private fb = inject(FormBuilder);
  private sorteoService = inject(SorteoService);
  private billeteService = inject(BilleteService);

  public sorteos: Sorteo[] = []; 
  
  public billeteForm!: FormGroup;
  public sorteoSeleccionadoId: number | null = null; 
  public registroExitoso: boolean = false;
  public errorGeneral: string | null = null;
  public cargando: boolean = true; 
  public creando: boolean = false;

  ngOnInit(): void {
    this.cargarSorteos();
    this.inicializarFormulario();
  }

  cargarSorteos(): void {
    this.cargando = true;
    this.errorGeneral = null;

    this.sorteoService.listarSorteos().subscribe({
      next: (data) => {
        this.sorteos = data; 
        this.cargando = false;
      },
      error: (err) => {
        this.errorGeneral = 'Error al cargar los sorteos. El servicio no respondió o hubo un fallo en la API.';
        this.cargando = false;
      }
    });
  }
  
  inicializarFormulario(): void {
    this.billeteForm = this.fb.group({
      numero: ['', [Validators.required, Validators.min(1)]],
      precio: [1000, [Validators.required, Validators.min(0.01)]], 
    });
  }
  
  onSorteoSeleccionado(sorteoId: number | null): void {
    this.sorteoSeleccionadoId = sorteoId; 
    this.errorGeneral = null; 
  }

  onSubmit(): void {
    this.registroExitoso = false;
    this.errorGeneral = null;

    if (this.billeteForm.invalid || this.sorteoSeleccionadoId === null) { 
      this.billeteForm.markAllAsTouched();
      this.errorGeneral = 'Debe seleccionar un sorteo y llenar todos los campos.';
      return;
    }

    this.creando = true;
    
    const nuevoBillete: Partial<Billete> = this.billeteForm.value;
    const sorteoId = this.sorteoSeleccionadoId;

    this.billeteService.crearBillete(nuevoBillete, sorteoId).subscribe({
      next: () => {
        this.registroExitoso = true;
        this.creando = false;
        this.billeteForm.reset({ precio: this.formControls['precio'].value }); 
      },
      error: (err) => {
        this.errorGeneral = err.error?.message || 'Error al crear el billete.';
        this.creando = false;
      }
    });
  }

  get formControls() {
    return this.billeteForm.controls;
  }
}