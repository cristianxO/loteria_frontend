import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'clientes', pathMatch: 'full' }, 
  
    {
        path: 'clientes',
        loadComponent: () => 
            import('./features/clientes/registrar-cliente/registrar-cliente.component')
            .then(m => m.RegistrarClienteComponent)
    },
];
