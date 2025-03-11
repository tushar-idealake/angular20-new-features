import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h2>{{ version }} - Exponential operator on template</h2>
      <p>Use ** operator on the template</p>
      <div>
          <p>Case 1: ** operator applied to two integers.</p>
          <p>2 ** 5 = {{ 2 ** 5 }}</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  version = VERSION.full;
}
