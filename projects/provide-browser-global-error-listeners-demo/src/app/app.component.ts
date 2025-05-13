import { ChangeDetectionStrategy, Component, linkedSignal, signal, VERSION } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SquareRootError } from './errors/square-root.error';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  name = 'provideBrowserGlobalErrorListeners';
  prs = [
    'https://github.com/angular/angular/pull/60704',
  ];
  description = 'Report window errors and unhandledrejection errors to Angular ErrorHandler';
  title = 'provideBrowserGlobalErrorListenersDemo';

  query = signal(0);
  neutralNumber = signal<number | undefined>(undefined);
  squareRoot = linkedSignal(() => 
    typeof this.neutralNumber() !== 'undefined' ?
      Math.sqrt(this.neutralNumber() as number) : undefined
  );

  calculateSquareRoot() {
    const value = this.query();
    if (value < 0) {
      throw new SquareRootError(value)
    }

    this.neutralNumber.set(value);
  }

  query2 = signal(0);
  neutralNumber2 = signal<number | undefined>(undefined);
  squareRoot2 = linkedSignal(() => 
    typeof this.neutralNumber2() !== 'undefined' ?
      Math.sqrt(this.neutralNumber2() as number) : undefined
  );
  
  calculateSquareRoot2() {
    new Promise<number>((resolve, reject) => {
      const value = this.query2();
      if (value < 0) {
        reject(new SquareRootError(value));
        //console.error(`Cannot calculate square root of ${value}`,'can we set Error name?');
      }
      resolve(value);
    }).then((value) => this.neutralNumber2.set(value));
  }
}
