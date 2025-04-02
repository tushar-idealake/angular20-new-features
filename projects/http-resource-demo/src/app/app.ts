import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, Injector, linkedSignal, signal, VERSION } from '@angular/core';
import { Joke, JokeAudit, jokeSchema } from './schemas/joke.schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.ng.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  version = VERSION.full;
  prs = [
    'https://github.com/angular/angular/pull/59876',
    'https://github.com/angular/angular/pull/60026'
  ];
  name = 'httpResource equality function';
  description = 'httpResource to query data';

  numClicked = signal(0);
  category = signal('');

  jokeResource = httpResource(() => 
  this.category() ? 
  `https://v2.jokeapi.dev/joke/${this.category()}?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single&idRange=1-5`: undefined, {
    parse: jokeSchema.parse,
    equal: (a, b) => a.id == b.id,
    defaultValue: {
      id: -1,
      error: false,
      joke: '',
      category: '',
    },
  });

  jokeAudit = linkedSignal<{ joke: Joke }, JokeAudit>({
    source: () => ({ joke: this.jokeResource.value() }),
    computation: (source, previous) => {
      const previousUpdates = previous?.value?.numUpdates;
      const numUpdates = typeof previousUpdates !== 'undefined' ? previousUpdates : -1;
      return { 
        ...source.joke,
        numUpdates: numUpdates + 1,
      };
    }
  });

  generateJoke() {
    this.category.set('Programming');
    this.numClicked.update((prev) => prev + 1);
    this.jokeResource.reload();
  }
}