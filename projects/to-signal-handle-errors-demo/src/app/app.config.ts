import { provideHttpClient } from '@angular/common/http';
import {
  ErrorHandler,
  provideExperimentalZonelessChangeDetection,
  signal
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { routes } from './app.routes';
import { ERROR_DIALOG_TOKEN, ErrorDialog } from './errors/error-token.constant';
import { GlobalErrorHandler } from './errors/global-error-handler';

class ErrorDialogImpl extends ErrorDialog {
  show = signal(false);
  show$ = new BehaviorSubject(false);

  setShow(show: boolean) {
    this.show.set(show);
    this.show$.next(show);
  }
}

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {
      provide: ERROR_DIALOG_TOKEN,
      useClass: ErrorDialogImpl,
    },
  ],
};
