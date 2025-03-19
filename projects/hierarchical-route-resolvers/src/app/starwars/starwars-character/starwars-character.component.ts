import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-starwars-character',
  imports: [],
  templateUrl: './starwars-character.component.html',
  styleUrl: './starwars-character.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StarwarsCharacterComponent {

}
