import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public navItems = [
      { name: 'Sorteos', path: '/sorteos-gestion' },
      { name: 'Venta de Billetes', path: '/venta-gestion' },
      { name: 'Crear Billetes', path: '/billetes-gestion' },
      { name: 'Clientes e Historial', path: '/clientes-gestion' },
    ];
}
