import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RawStarWarsCharacter, StarWarsCharacter } from '../starwars-character.type';
import { catchError, forkJoin, map, of } from 'rxjs';

function toStarWarsCharacterMapper(id: number, fromData: RawStarWarsCharacter) {
  return {
    id,
    gender: fromData.gender,
    eyeColor: fromData.eye_color,
    hairColor: fromData.hair_color,
    skinColor: fromData.skin_color,
    name: fromData.name,
    films: fromData.films,
  } as StarWarsCharacter
}

@Injectable({
  providedIn: 'root'
})
export class StarWarsCharacterService {
  #httpClient = inject(HttpClient);

  retrieveCharacters(ids: number[]) {
    const starWarsCharacterObservables = ids.map((id) => 
      this.#httpClient.get<RawStarWarsCharacter>(`https://swapi.py4e.com/api/people/${id}`)
        .pipe(
          map((fromCharacter) => toStarWarsCharacterMapper(id, fromCharacter)),
          catchError((e) => {
            console.error(e);
            return of(undefined)
          })
        )
    ) 
      
    return forkJoin(starWarsCharacterObservables)
      .pipe(
        map((characters) => {
            return characters.filter((c) => typeof c !== 'undefined')
        })  
      );
  }
}
