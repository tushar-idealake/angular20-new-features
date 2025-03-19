import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { StarWarsCharacterService } from '../services/star-wars-character.service';
import { StarWarsCharacter } from '../starwars-character.type';

@Component({
  selector: 'app-starwars-list',
  imports: [JsonPipe],
  templateUrl: './starwars-list.component.html',
  styleUrl: './starwars-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StarwarsListComponent {
  fighterIds = inject(ROUTER_OUTLET_DATA) as Signal<{ ids: number[] }>;
  httpClient = inject(HttpClient);
  starWarsCharacterService = inject(StarWarsCharacterService);

  charactersResource = rxResource({
    request: () => this.fighterIds().ids,
    loader: ({ request }) => 
      this.starWarsCharacterService.retrieveCharacters(request),
    defaultValue: [] as StarWarsCharacter[]
  });
}
