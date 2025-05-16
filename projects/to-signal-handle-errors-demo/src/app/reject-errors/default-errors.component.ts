import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, filter, map, scan } from 'rxjs';
import { ERROR_TRACKING_TOKEN } from '../errors/error-token.constant';

@Component({
  selector: 'app-default-errors-example',
  imports: [FormsModule],
  template: `
    <h3>Default error handling of toSignal. When the signal is accessed, it throws the error.</h3>
    <p>The global error handler increments the #errorCaughtSub BehaviorSubject and opens an alert box.</p>
    <p>Subsequent keypress opens the alert box.</p>

    <div>
      <p>Hint: {{ hint() }}</p>
    </div>
    Your guess: <input type="number" [ngModel]="something.getValue()" 
      (ngModelChange)="something.next($event)"/>
  `,
  styles: `
    button {
      margin-right: 1rem;
      padding: 0.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DefaultErrorsComponent {
  #errorTracking = inject(ERROR_TRACKING_TOKEN);
  something = new BehaviorSubject(1);
  debounce$ = this.something.pipe(debounceTime(200));

  myGuess = 333;

  #hint$ = this.debounce$.pipe(
    filter((v) => Math.floor(v) === v),
    filter((v) => v >= 1 && v <= 10000),
    scan((acc, v) => {
      if (v < acc.left || v > acc.right) {
        return acc;
      }

      if (v < this.myGuess) {
        return {
          left: v,
          right: acc.right,
          guess: v
        };
      } else if (v > this.myGuess) {
        return {
          left: acc.left,
          right: v,
          guess: v
        };
      }

      return { ...acc, guess: v };
    }, { left: 1, right: 10000, guess: -1 }),
    map(({ left, right, guess }) => {
      if (guess === this.myGuess) {
        throw new Error(
          'Error is thrown and the global error handler handles it'
        );
      }
      return `Guess an integer between ${left} and ${right}`;
    }),
  );

  hint = toSignal(this.#hint$, {
    initialValue: 'Guess an integer between 1 and 10000'
  });

  constructor() {
    this.#errorTracking.getErrorCount$.pipe(takeUntilDestroyed())
    .subscribe((v) => { 
      if (v > 0) {
        alert(`Number of error caught: ${v}`);
      }
    });
  }
}
