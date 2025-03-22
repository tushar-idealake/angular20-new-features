import {
  ErrorHandler,
  inject,
  Injectable
} from '@angular/core';
import { ERROR_TRACKING_TOKEN } from './error-token.constant';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  errorTracking = inject(ERROR_TRACKING_TOKEN);

  handleError(error: any) {
    console.error('in GlobalErrorHandler', error);
    this.errorTracking.addNumErrors();
  }
}
