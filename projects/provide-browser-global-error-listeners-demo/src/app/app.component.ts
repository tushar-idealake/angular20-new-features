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
    if (this.query() < 0) {
      throw new SquareRootError(this.query())
    }

    this.neutralNumber.set(this.query());
  }
}
