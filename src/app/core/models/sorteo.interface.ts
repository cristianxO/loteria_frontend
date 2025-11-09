import { Billete } from './billete.interface';

export interface Sorteo {
  id: number;
  nombreSorteo: string; 
  fechaSorteo: string;
  billetes: Billete[];
}