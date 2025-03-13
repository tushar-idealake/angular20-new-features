import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { getPerson } from './star-war.api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-star-war-character',
  imports: [],
  template: `
    <div class="border">
      @if(person(); as person) {
        <p>Id: {{ id() }} </p>
        @if (isSith()) {
          <p>A Sith, he is evil.</p>
        }
        <p>Name: {{ person.name }}</p>
        <p>Height: {{ person.height }}</p>
        <p>Mass: {{ person.mass }}</p>
        <p>Hair Color: {{ person.hair_color }}</p>
        <p>Skin Color: {{ person.skin_color }}</p>
        <p>Eye Color: {{ person.eye_color }}</p>
        <p>Gender: {{ person.gender }}</p>
      } @else {
        <p>No info</p>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      font-size: 1rem;
      padding: 1rem;
    }

    .border {
      border: 1px solid black; 
      border-radius: 0.5rem; 
      padding: 1rem; 
      margin-bottom: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppStarWarCharacterComponent {  
  id = input(1);
  isSith = input(false);

  getPersonFn = getPerson();

  person = toSignal(toObservable(this.id)
    .pipe(
      switchMap((id) => this.getPersonFn(id)),
    )
  );
}
