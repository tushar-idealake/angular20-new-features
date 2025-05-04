import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { of } from 'rxjs';
import { LINKS } from './app.link';
import { PokemonService } from './pokemon/services/pokemon.service';

const pokemonRoutes: Routes = LINKS.map(({ path, label: title }, i) => {
    const route = `/pokemon/${path}`;
    return {
        path,
        title,
        redirectTo: () => i % 2 === 0 ? of(route) : Promise.resolve(route)
    }
});

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
