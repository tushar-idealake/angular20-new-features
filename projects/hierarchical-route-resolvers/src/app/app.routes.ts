import { inject } from '@angular/core';
import { ROUTER_OUTLET_DATA, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'starwars',
        title: 'Star Wars List',
        loadComponent: () => import('./starwars/starwars-list/starwars-list.component'),
        // resolve: {
        //     data: () => {
        //         const routerOutletData = inject(ROUTER_OUTLET_DATA);
        //         console.log('test resolver');
        //         return 'hello';
        //     }
        // }
    },
    {
        path: '**',
        redirectTo: 'starwars',
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'starwars'
    }
];
