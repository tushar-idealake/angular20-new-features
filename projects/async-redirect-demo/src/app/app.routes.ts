import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { OriginPokemon, Pokemon } from './pokemon/types/pokemon.type';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./home/home.component'),
    },
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
                                cries: Object.keys(data.cries).map((key) => data.cries[key]),
                                sprites: Object.keys(data.sprites)
                                    .map((key) => data.sprites[key])
                                    .filter((sprite) => sprite !== null && typeof sprite === 'string')
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
        path: 'pikachu',
        redirectTo: () => of('/pokemon/pikachu')
    },
    {
        path: 'bulbasaur',
        redirectTo: () => of('/pokemon/bulbasaur')
    },
    {
        path: 'pidgeot',
        redirectTo: () => Promise.resolve('/pokemon/pidgeot')
    },
    {
        path: 'jigglypuff',
        redirectTo: () => Promise.resolve('/pokemon/jigglypuff')
    },
    {
        path: 'meowth',
        redirectTo: () => Promise.resolve('/pokemon/meowth')
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
