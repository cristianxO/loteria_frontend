import { Billete } from './billete.interface'; 

export interface Cliente {
  id: number;
  nombre: string;
  correo: string;
  billetes: Billete[]; 
}