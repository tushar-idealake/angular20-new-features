import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "starwars",
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
