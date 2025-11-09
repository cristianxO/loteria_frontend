import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Billete } from '../models/billete.interface';

@Injectable({
  providedIn: 'root'
})
export class BilleteService {
  private apiUrl = 'http://localhost:8080/billetes';
  constructor(private http: HttpClient) { }

  crearBillete(billeteData: Partial<Billete>, sorteoId: number): Observable<Billete> {
    const url = `${this.apiUrl}/${sorteoId}`; 
    return this.http.post<Billete>(url, billeteData);
  }

  obtenerHistorialPorCliente(clienteId: number): Observable<Billete[]> {
    const url = `http://localhost:8080/clientes/${clienteId}/billetes`; 
    return this.http.get<Billete[]>(url);
  }
}
