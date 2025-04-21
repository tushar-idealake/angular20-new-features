import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { HttpResourcePokemonComponent } from './http/httpresource-pokemon.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HttpResourcePokemonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  prs = [
    'https://github.com/angular/angular/pull/60802',
  ];
  name = 'httpResource error status code and header Demo';
  description = 'Setting response header and status code during error';
}
