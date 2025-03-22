import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export interface ErrorTracking {
  addNumErrors(): void;
  getErrorCount$: Observable<number>;
}

export const ERROR_TRACKING_TOKEN = new InjectionToken<ErrorTracking>(
  'ERROR_TRACKING_TOKEN'
);
