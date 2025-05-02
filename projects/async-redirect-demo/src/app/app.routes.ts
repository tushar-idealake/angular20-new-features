import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { OriginPokemon, Pokemon } from './pokemon/types/pokemon.type';
import { LINKS } from './app.link';

const pokemonRoutes: Routes = LINKS.map(({ path, label: title }, i) => {
    const route = `/pokemon/${path}`;
    return {
        path,
        title,
        redirectTo: () => i % 2 === 0 ? of(route) : Promise.resolve(route)
    }
});

console.log('pokemonRoutes', pokemonRoutes);

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
                const id = route.params['id'];
                const httpClient = inject(HttpClient);
                return httpClient.get<OriginPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
                    .pipe(
                        map((data) => ({                             
                                name: data.name,
                                id: data.id,
                                height: data.height,
                                weight: data.weight,
                                sprites: Object.keys(data.sprites)
                                    .map((key) => data.sprites[key])
                                    .filter((sprite) => sprite !== null && typeof sprite === 'string'),
                                types: data.types.map((type) => ({ slot: type.slot, type: type.type.name }))
                            }) as Pokemon
                        ),
                        catchError((e) => { 
                            if (e instanceof Error) {
                                console.error(e.message);
                            } else {
                                console.error(e);
                            }
                            return of(undefined);
                        })
                    );
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
