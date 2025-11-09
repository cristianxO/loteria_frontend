import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sorteo } from '../models/sorteo.interface';
import { Billete } from '../models/billete.interface';

@Injectable({
  providedIn: 'root'
})
export class SorteoService {
  private apiUrl = 'http://localhost:8080/sorteos';
  constructor(private http: HttpClient) { }

  listarSorteos(): Observable<Sorteo[]> {
    return this.http.get<Sorteo[]>(this.apiUrl);
  }

  venderBillete(sorteoId: number, clienteId: number, billeteId: number): Observable<Billete> {
    const url = `${this.apiUrl}/${sorteoId}/${clienteId}/${billeteId}`;
    return this.http.patch<Billete>(url, null); 
  }
}
