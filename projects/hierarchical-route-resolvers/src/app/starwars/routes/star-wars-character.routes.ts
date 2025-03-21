import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { StarWarsCharacterService } from '../services/star-wars-character.service';
import StarwarsCharacterComponent from '../starwars-character/starwars-character.component';

const starWarsCharacterRoutes: Routes = [
    {
        path: '',
        component: StarwarsCharacterComponent,
        resolve: {
            fighter: (route: ActivatedRouteSnapshot) => {
                const id = route.params['id']
                const isSith = route.queryParams['isSith'] === 'true'
                const service = inject(StarWarsCharacterService);
                return service.retrieveCharacter(id, isSith);
            }
        },
        children: [
            {
                path: 'films',
                title: 'Star Wars Films',
                loadComponent: () => import('../starwars-movies/starwars-movies.component'),
                resolve: {
                    urls: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>  {
                        console.log(route);
                        console.log('figher', route.data['fighter']); // Why is it null?
                        return ''
                    }
                }
            }
        ] 
    }
];

export default starWarsCharacterRoutes;
