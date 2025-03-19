import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-starwars-movies',
  imports: [],
  templateUrl: './starwars-movies.component.html',
  styleUrl: './starwars-movies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarwarsMoviesComponent {

}
