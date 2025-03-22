import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, catchError, EMPTY, map, of, scan, throwError } from 'rxjs';
import ErrorDialogComponent from '../errors/error-dialog.component';
import { ERROR_DIALOG_TOKEN } from '../errors/error-token.constant';

@Component({
  selector: 'app-reject-errors-example',
  standalone: true,
  imports: [ErrorDialogComponent],
  template: `
    <h3>With rejectErrors option, toSignal has to catch the uncaught exception and handle it explicitly.</h3>
    <div>
      <p>total: {{ total() }}</p>
    </div>
    <button (click)="something.next(1)">Add</button>
    <button (click)="something.next(-1)">Subtract</button>
    <app-error-dialog (closeClicked)="this.errorDialog().close()">
      <p>toSignal removes rejectErrors option. Application should perform error handling explicitly.</p>
    </app-error-dialog>
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
  modal = inject(ERROR_DIALOG_TOKEN);
  errorDialog = viewChild.required(ErrorDialogComponent);

  something = new BehaviorSubject(0);

  #total$ = this.something.pipe(
    scan((acc, v) => acc + v, 0),
    map((v) => {
      console.log('In map operator');
      if (v === 5) {
        throw new Error('throw a rejectErrors error');
      }
      return v;
    }),
    catchError((e) => {
      console.error(e);
      this.errorDialog().open();
      return EMPTY;
    })
  )

  total = toSignal(this.#total$, { initialValue: 0 });
}
