import { InjectionToken, WritableSignal } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

export abstract class ErrorDialog {
  abstract show: WritableSignal<boolean>;
  abstract show$: BehaviorSubject<boolean>;
  abstract setShow(show: boolean): void;
}

export const ERROR_DIALOG_TOKEN = new InjectionToken<ErrorDialog>(
  'ERROR_DIALOG_TOKEN'
);
