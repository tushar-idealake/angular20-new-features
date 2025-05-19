import { catchError, map, Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person, PersonWithoutId } from './star-wars.type';

const URL = 'https://swapi.tech/api/people';

export function getPerson() {
  const http = inject(HttpClient);
  return (id: number): Observable<Person | any> => 
    http.get<PersonWithoutId>(`${URL}/${id}`).pipe(
  map((p) => ({ ...p, id })),
  catchError((err) => {
          console.error(err);
          return of(undefined);
        }));
}
