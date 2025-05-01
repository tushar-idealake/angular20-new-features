import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Pokemon } from './types/pokemon.type';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent {
  pokemon = input<Pokemon | undefined>(undefined);
}
