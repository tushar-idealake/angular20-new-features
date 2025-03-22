import {
  assertNotInReactiveContext,
  ErrorHandler,
  inject,
  Injectable,
} from '@angular/core';
import { ERROR_DIALOG_TOKEN } from './error-token.constant';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  modal = inject(ERROR_DIALOG_TOKEN);

  handleError(error: any) {
    assertNotInReactiveContext(this.handleError, 'GlobalErrorHandler');
    console.log('this.modal.show() before ->', this.modal.show());
    console.error('in GlobalErrorHandler', error);
    this.modal.setShow(true);
    console.log('this.modal.show() after ->', this.modal.show());
  }
}
