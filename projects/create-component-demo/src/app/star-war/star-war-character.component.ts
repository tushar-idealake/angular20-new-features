import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { getPerson } from './star-war.api';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-star-war-character',
  imports: [],
  template: `
    <div class="border">
      @if(person(); as person) {
        <p><span>Id:</span> {{ person.id }} </p>
        @if (isSith()) {
          <p>A Sith, he is evil.</p>
        }         
        <p><span>Name: </span>{{ person?.result?.properties.name }}</p>
        <p><span>Height: </span>{{ person?.result?.properties.height }}</p>
        <p><span>Mass:</span> {{ person?.result?.properties.mass }}</p>
        <p><span>Hair Color:</span> {{ person?.result?.properties.hair_color }}</p>
        <p><span>Skin Color:</span> {{ person?.result?.properties.skin_color }}</p>
        <p><span>Eye Color:</span> {{ person?.result?.properties.eye_color }}</p>
        <p><span>Gender:</span> {{ person?.result?.properties.gender }}</p>
        <button (click)="alertStarWars.emit(person?.result?.properties.name)">Alert parent</button>
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

  alertStarWars = output<string>();

  getPersonFn = getPerson();

  person = toSignal(toObservable(this.id)
    .pipe(
      switchMap((id) => this.getPersonFn(id)),
    )
  );
}
