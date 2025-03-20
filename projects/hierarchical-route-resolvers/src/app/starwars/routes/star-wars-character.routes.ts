import { routes } from './../../app.routes';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import StarwarsCharacterComponent from '../starwars-character/starwars-character.component';
import { inject } from '@angular/core';
import { StarWarsCharacterService } from '../services/star-wars-character.service';
import { tap } from 'rxjs';

const starWarsCharacterRoutes: Routes = [
    {
        path: '',
        component: StarwarsCharacterComponent,
        resolve: {
            fighter: (route: ActivatedRouteSnapshot) => {
                const id = route.params['id']
                const isSith = route.queryParams['isSith'] === 'true'
                console.log(id, isSith)
                const service = inject(StarWarsCharacterService);
                return service.retrieveCharacter(id, isSith)
                    .pipe(
                        tap((x) => console.log(x))
                    )
            }
        },
        children: [
            {
                path: 'films',
                title: 'Star Wars Films',
                loadComponent: () => import('../starwars-movies/starwars-movies.component'),
                resolve: {
                    urls: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>  {
                        // console.log(route, state);
                        return ''
                    }
                }
            }
        ] 
    }
];

export default starWarsCharacterRoutes;
