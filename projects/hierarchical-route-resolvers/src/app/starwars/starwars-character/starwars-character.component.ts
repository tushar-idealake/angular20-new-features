import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { ROUTER_OUTLET_DATA } from '@angular/router';
import { StarWarsCharacterNature } from '../starwars-character.type';

@Component({
  selector: 'app-starwars-character',
  imports: [JsonPipe],
  templateUrl: './starwars-character.component.html',
  styleUrl: './starwars-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StarwarsCharacterComponent {
  fighter = inject(ROUTER_OUTLET_DATA) as Signal<StarWarsCharacterNature>;
}
