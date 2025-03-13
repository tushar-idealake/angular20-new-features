import { catchError, of } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Person = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
  films: string[];
}

const URL = 'https://swapi.dev/api/people';

export function getPerson() {
  const http = inject(HttpClient);
  return (id: number) => http.get<Person>(`${URL}/${id}`).pipe(
    catchError((err) => {
      console.error(err);
      return of(undefined);
    }));
}
