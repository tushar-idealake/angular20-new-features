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
                loadChildren: () => import ('./star-wars-character.routes'),
            }
        ] 
    }
];

export default starWarsListRoutes;
