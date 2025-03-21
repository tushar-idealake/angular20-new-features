import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StarWarsCharacterNature } from '../starwars-character.type';

@Component({
  selector: 'app-starwars-character',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './starwars-character.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StarwarsCharacterComponent {
  showFilms = signal(false);
  fighter = input<StarWarsCharacterNature | undefined>(undefined)
}
