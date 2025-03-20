import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ROUTER_OUTLET_DATA, RouterOutlet } from '@angular/router';
import { StarWarsCardComponent } from '../star-wars-card/star-wars-card.component';
import { StarWarsCharacterService } from '../services/star-wars-character.service';
import { StarWarsCharacter, StarWarsCharacterNature } from '../starwars-character.type';

@Component({
  selector: 'app-starwars-list',
  imports: [StarWarsCardComponent, RouterOutlet],
  template: `
    <div>
        <h3 class="fighters">Fighters</h3>
        @if (charactersResource.isLoading()) {
            <p>Loading characters...</p>
        } @else if (charactersResource.error()) {
            <p>Error: {{ charactersResource.error() }}</p>
        } @else {
          @if (charactersResource.hasValue()) {
            @for (c of charactersResource.value(); track c.id) {
                <app-star-wars-card [c]="c" />
            }
            <router-outlet />
          }
        }
    </div>
  `,
  styles: `
    .fighters {
      font-style: italic; 
      text-decoration: underline; 
      margin-bottom: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StarwarsListComponent {
  fighterIds = inject(ROUTER_OUTLET_DATA) as Signal<{ ids: number[], isSith: boolean }>;
  starWarsCharacterService = inject(StarWarsCharacterService);
  selectedFighter = signal<StarWarsCharacterNature | undefined>(undefined);
  
  charactersResource = rxResource({
    request: () => this.fighterIds(),
    loader: ({ request }) => 
      this.starWarsCharacterService.retrieveCharacters(request),
    defaultValue: [] as StarWarsCharacterNature[]
  });

  selectFighter(character: StarWarsCharacter) {
    const isSith = this.fighterIds().isSith;
    this.selectedFighter.set({ ...character, isSith });
  }
}
