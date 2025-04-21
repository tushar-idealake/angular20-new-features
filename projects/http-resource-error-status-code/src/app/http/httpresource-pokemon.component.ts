import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { makeResourceRefStatus } from './utils/resource-ref.util';
import { z } from 'zod';

const PIKACHU_URL = 'https://pokeapi.co/api/v2/pokemon/pikachu';
const ANGULAR_URL = 'https://pokeapi.co/api/v2/pokemon/angular';

const pokemonSchema = z.object({
  id: z.number(),
  name: z.string(),
  weight: z.number(),
  height: z.number(),
});

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

  contentType = computed(() => {
    if (this.headers()?.has('content-type')) {
      return this.headers()?.get('content-type') as string;
    }
    return undefined;
  });

  result = computed(() => {
    return this.pokemonResourceRef.hasValue() ? 
      this.pokemonResourceRef.value() : undefined;
  });
}
