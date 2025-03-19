import { Routes } from '@angular/router';
import StarwarsListComponent from '../starwars-list/starwars-list.component';

const starWarsListRoutes: Routes = [
    {
        path: '',
        component: StarwarsListComponent,
        children: [
            {
                path: 'fighters/:id',
                title: 'Star Wars Fighter',
                loadComponent: () => import('../starwars-character/starwars-character.component'),
            }
        ] 
    }
];

export default starWarsListRoutes;

