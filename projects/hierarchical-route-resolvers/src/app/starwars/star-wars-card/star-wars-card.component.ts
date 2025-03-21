import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StarWarsCharacterNature } from '../starwars-character.type';

@Component({
  selector: 'app-star-wars-card',
  imports: [RouterLink],
  template: `
    <div class="card">
      <span>Id: {{ c().id }}</span>&nbsp;&nbsp;&nbsp;
      <a [routerLink]="['fighters', c().id]" 
        [queryParams]="{ 'isSith': c().isSith }">{{ c().name }}</a>
    </div>
  `,
  styles: `
    .card { 
      border: 1px solid black; 
      border-radius: 0.25rem; 
      margin-bottom: 0.25rem; 
      padding: 0.35rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarWarsCardComponent {
  c = input.required<StarWarsCharacterNature>();
  selectedFighter = signal<StarWarsCharacterNature | undefined>(undefined);
  
  selectFighter() {
    // if (this.selectedFighter()) {
    //   this.selectedFighter.set(undefined);
    // } else {
    //   this.selectedFighter.set(this.c());
    // }
  }
}
