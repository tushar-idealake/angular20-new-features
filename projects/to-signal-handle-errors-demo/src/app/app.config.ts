import { provideHttpClient } from '@angular/common/http';
import {
  ErrorHandler,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { ERROR_TRACKING_TOKEN } from './errors/error-token.constant';
import { ErrorTrackingImpl } from './errors/error-tracking.service';
import { GlobalErrorHandler } from './errors/global-error-handler';


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
      provide: ERROR_TRACKING_TOKEN,
      useClass: ErrorTrackingImpl,
    },
  ],
};
