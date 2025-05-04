import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { pokemonRoutes } from './app.link';
import { PokemonService } from './pokemon/services/pokemon.service';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component'),
    },
    ...pokemonRoutes,
    {
        path: 'pokemon/:id',
        resolve:{
            pokemon: (route: ActivatedRouteSnapshot) => { 
                const service = inject(PokemonService);
                const id = route.params['id'];
                return service.retrieve(id);
            }
        },
        loadComponent: () => import('./pokemon/pokemon.component'),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
