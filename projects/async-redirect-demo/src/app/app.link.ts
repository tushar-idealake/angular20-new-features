import { Routes } from '@angular/router';
import { of } from 'rxjs';

export const LINKS = [
    {
        path: 'pikachu',
        label: 'Pikachu'
    },
    {
        path: 'bulbasaur',
        label: 'Bulbasaur'
    },
    {
        path: 'pidgeot',
        label: 'Pidgeot'
    },
    {
        path: 'jigglypuff',
        label: 'Jigglypuff'
    },
    {
        path: 'meowth',
        label: 'Meowth'
    },
    {
        path: 'ponyta',
        label: 'Ponyta'
    }
];

export const pokemonRoutes: Routes = LINKS.map(({ path, label: title }, i) => {
    const route = `/pokemon/${path}`;
    return {
        path,
        title,
        redirectTo: () => i % 2 === 0 ? of(route) : Promise.resolve(route)
    }
});
