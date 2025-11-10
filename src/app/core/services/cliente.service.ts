import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/clientes';
  constructor(private http: HttpClient) { }

  registrarCliente(clienteData: Partial<Cliente>): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, clienteData);
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
}
