import { ChangeDetectionStrategy, Component, input, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from './types/pokemon.type';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonComponent implements OnChanges {
  pokemon = input<Pokemon | undefined>(undefined);

  // debugger
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemon']) {
      console.log(changes);
    }
  }
}
