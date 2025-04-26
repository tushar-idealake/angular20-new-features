import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { makeResourceRefStatus } from './utils/resource-ref.util';
import { pokemonSchema } from './schemas/pokemon.schema';

const PIKACHU_URL = 'https://pokeapi.co/api/v2/pokemon/pikachu';
const ANGULAR_URL = 'https://pokeapi.co/api/v2/pokemon/angular';

@Component({
  selector: 'app-resource-pokemon',
  templateUrl: './httpresource-pokemon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpResourcePokemonComponent {
  data = signal('');
  prev = signal('');

  setUrl() {
    this.prev.set(this.data());
    if (!this.data()) {
      this.data.set(PIKACHU_URL);
    } else {
      this.data.set(this.data() === PIKACHU_URL ? ANGULAR_URL : PIKACHU_URL);
    }
  }

  pokemonResourceRef = httpResource(
    () => this.data() !== this.prev() ? { 
      url: this.data(),
      method: 'GET',
    } : undefined, {
      parse: pokemonSchema.parse
  });

  resourceRefStatus = makeResourceRefStatus(this.pokemonResourceRef);
  error = this.resourceRefStatus.error;
  statusCode = this.resourceRefStatus.statusCode;
  headers = this.resourceRefStatus.headers;
  value = this.resourceRefStatus.value;
}
