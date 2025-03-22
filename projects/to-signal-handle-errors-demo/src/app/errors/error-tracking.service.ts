import { BehaviorSubject } from 'rxjs';
import { ErrorTracking } from './error-token.constant';

export class ErrorTrackingImpl implements ErrorTracking {
    #errorCaughtSub = new BehaviorSubject(0);

    addNumErrors(): void {
      this.#errorCaughtSub.next(this.#errorCaughtSub.getValue() + 1);
    }
    
    getErrorCount$ = this.#errorCaughtSub.asObservable(); 
}
