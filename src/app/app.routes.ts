import { Routes } from '@angular/router';
import { ClientesViewComponent } from './features/clientes/clientes-view/clientes-view.component';
import { SorteosViewComponent } from './features/sorteos/sorteos-view/sorteos-view.component';
import { VentaViewComponent } from './features/sorteos/venta-view/venta-view.component';
import { BilletesViewComponent } from './features/sorteos/billetes-view/billetes-view.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sorteos-gestion', pathMatch: 'full' },

    { path: 'clientes-gestion', component: ClientesViewComponent },
    
    { path: 'sorteos-gestion', component: SorteosViewComponent },

    { path: 'venta-gestion', component: VentaViewComponent },
    
    { path: 'billetes-gestion', component: BilletesViewComponent },
    
    { path: '**', redirectTo: 'sorteos-gestion' }
  
];
