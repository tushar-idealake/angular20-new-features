import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, catchError, debounceTime, EMPTY, filter, map, scan } from 'rxjs';
import { ERROR_TRACKING_TOKEN } from '../errors/error-token.constant';

@Component({
  selector: 'app-reject-errors-example',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h3>With rejectErrors option removed, toSignal catches the uncaught exception and handles it explicitly.</h3>
    <p>The observable's catchError operator returns EMPTY to complete the observable.</p>
    <p>Subsequent input to the textbox has no effect.</p>
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
export default class RejectErrorsComponent {
  #errorTracking = inject(ERROR_TRACKING_TOKEN);
  numErrors = toSignal(this.#errorTracking.getErrorCount$, { initialValue: 0 });

  something = new BehaviorSubject(1);
  debounce$ = this.something.pipe(debounceTime(300));

  myGuess = 5;

  #hint$ = this.debounce$.pipe(
    filter((v) => Math.floor(v) === v),
    filter((v) => v >= 1 && v <= 100),
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
    }, { left: 1, right: 100, guess: -1 }),
    map(({ left, right, guess }) => {
      if (guess === this.myGuess) {
        throw new Error(
          'Error is thrown and the global error handler handles it'
        );
      }
      return `Guess an integer between ${left} and ${right}`;
    }),
    catchError((e) => {
      console.error(e);
      this.#errorTracking.addNumErrors();
      alert(`Number of error caught: ${this.numErrors()}`);
      return EMPTY;
    })
  );

  hint = toSignal(this.#hint$, {
    initialValue: 'Guess an integer between 1 and 100'
  });
}
