import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1>{{ version }} - Exponential operator on template</h1>
      <h2>Use ** operator on the template</h2>
      <div>
          <p>PRs:</p>
          <ol style="margin-bottom: 1rem;">
            <li>https://github.com/angular/angular/pull/59894</li>
            <li>https://github.com/angular/angular/pull/60101</li>
          </ol>

          <div class="row">
            <p>Case 1: ** operator applied to two integers.</p>
            <p>{{ a }} ** {{ b }} = {{ a ** b }}</p>
          </div>
          <div class="row">
            <p>Case 2: ** operator is right associative.</p>
            <p>{{ a }} ** {{ b }} ** {{ c }} = {{ a ** b ** c }}</p>
            <p>{{ a }} ** ({{ b }} ** {{ c }}) = {{ a ** (b ** c) }}</p>
          </div>
          <div class="row">
            <p>Case 3: parentheses is required around uary operator when it is the base of the ** operator.</p>
            <p>(-2) ** {{ e }} = {{ (-2) ** e }}</p>
            <p>(-2) ** {{ f }} = {{ (-2) ** f }}</p>
          </div>
          <div class="row">
            <p>Case 4: The base of the ** operator is a negative integer.</p>
            <p>{{ d }} ** {{ e }} = {{ d ** e }}</p>
            <p>{{ d }} ** {{ f }} =  {{ d ** f }}</p>
          </div>
        </div>
    </div>
  `,
  styles: `
    .row {
      padding: 0.5rem;
      border: 1px solid black;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  version = VERSION.full;
  a = 2;
  b = 3;
  c = 2;
  d = -2;
  e = 3;
  f = 4;
}
