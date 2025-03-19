import { ChangeDetectionStrategy, Component, inject, signal, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ROUTER_OUTLET_DATA, RouterLink, RouterOutlet } from '@angular/router';
import { StarWarsCharacterService } from '../services/star-wars-character.service';
import { StarWarsCharacter, StarWarsCharacterNature } from '../starwars-character.type';

@Component({
  selector: 'app-starwars-list',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './starwars-list.component.html',
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
    request: () => this.fighterIds().ids,
    loader: ({ request }) => 
      this.starWarsCharacterService.retrieveCharacters(request),
    defaultValue: [] as StarWarsCharacter[]
  });

  selectFighter(character: StarWarsCharacter) {
    const isSith = this.fighterIds().isSith;
    this.selectedFighter.set({ ...character, isSith });
  }
}
