export type EstadoBillete = 'DISPONIBLE' | 'VENDIDO';

export interface Billete {
  id: number;
  numero: number;
  precio: number;
  estado: EstadoBillete;
}