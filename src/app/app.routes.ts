import { Routes } from '@angular/router';
import { ListaSorteosComponent } from './features/sorteos/lista-sorteos/lista-sorteos.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sorteos', pathMatch: 'full' }, 
  
    {
        path: 'clientes',
        loadComponent: () => 
            import('./features/clientes/registrar-cliente/registrar-cliente.component')
            .then(m => m.RegistrarClienteComponent)
    },

    {
        path: 'sorteos',
        component: ListaSorteosComponent,
        children: [
        {
            path: 'crear',
            loadComponent: () =>
                import('./features/sorteos/crear-sorteo/crear-sorteo.component')
                .then(m => m.CrearSorteoComponent)
        },
        ]
    }
];
