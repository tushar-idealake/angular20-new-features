import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, EMPTY, map, scan } from 'rxjs';
import { ERROR_TRACKING_TOKEN } from '../errors/error-token.constant';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-reject-errors-example',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <h3>With rejectErrors option removed, toSignal catches the uncaught exception and handles it explicitly.</h3>
    <p>The observable's catchError operator returns EMPTY to complete the observable.</p>
    <p>Subsequent button clicks shows the last successful value, 4.</p>
    <div>
      <p>total: {{ total() }}</p>
      <p>Number errors caught: {{ numErrors$ | async }}</p>
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
export default class RejectErrorsComponent {
  #errorTracking = inject(ERROR_TRACKING_TOKEN);

  something = new BehaviorSubject(0);
  numErrors$ = this.#errorTracking.getErrorCount$;

  #total$ = this.something.pipe(
    scan((acc, v) => acc + v, 0),
    map((v) => {
      if (v === 5) {
        throw new Error('throw a rejectErrors error');
      }
      return v;
    }),
    catchError((e) => {
      console.error(e);
      this.#errorTracking.addNumErrors();
      return EMPTY;
    })
  );

  total = toSignal(this.#total$, { initialValue: 0 });
}
