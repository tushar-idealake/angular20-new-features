import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  template: `
    <dialog #dialog class="overlay">
      <ng-content>Error occurs</ng-content>
      <div>
        <button (click)="closeClicked.emit()">Close</button>
      </div>
    </dialog>
  `,
  styles: `
    button {
      margin-right: 1rem;
      padding: 0.5rem;
    }

    dialog {
      padding: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ErrorDialogComponent {
  closeClicked = output();

  dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  nativeDialog = computed(() => this.dialog().nativeElement);

  open() {
    this.nativeDialog().showModal();
  }

  close() {
    this.nativeDialog().close();
  }
}
