import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { OriginPokemon, Pokemon } from '../types/pokemon.type';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  httpClient = inject(HttpClient);

  private flattenSprites(sprites: Record<string, string | null | Record<string, any>>) {
    return Object.keys(sprites)
      .map((key) => sprites[key])
      .filter((sprite) => sprite !== null && typeof sprite === 'string');
  }

  retrieve(id: string) {
    return this.httpClient.get<OriginPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
  map(({ name, id, height, weight, sprites, types }) => ({                             
          name,
          id,
          height,
          weight,
          sprites: this.flattenSprites(sprites),
          types: types.map(({ slot, type: { name }}) => ({ slot, type: name }))
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
}
