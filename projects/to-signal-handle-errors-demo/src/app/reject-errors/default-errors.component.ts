import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, scan } from 'rxjs';
import { ERROR_TRACKING_TOKEN } from '../errors/error-token.constant';

@Component({
  selector: 'app-default-errors-example',
  template: `
    <h3>Default error handling of toSignal. When the signal is accessed, it throws the error.</h3>
    <p>The global error handler increments the #errorCaughtSub BehaviorSubject and opens an alert box.</p>
    <p>Subsequent button clicks triggers the error handler and opens the alert box.</p>

    <div>
      <p>total: {{ total() }}</p>
    </div>
    <button (click)="something.next(1)">Add</button>
    <button (click)="something.next(-1)">Subtract</button>
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
  something = new BehaviorSubject(0);

  #total$ = this.something.pipe(
    scan((acc, v) => acc + v, 0),
    map((v) => {
      if (v === 5) {
        throw new Error(
          'Error is thrown and the global error handler handles it'
        );
      }
      return v;
    }),
  );

  total = toSignal(this.#total$);

  constructor() {
    this.#errorTracking.getErrorCount$.pipe(takeUntilDestroyed())
    .subscribe((v) => { 
      if (v > 0) {
        alert(`Number of error caught: ${v}`);
      }
    });
  }
}
