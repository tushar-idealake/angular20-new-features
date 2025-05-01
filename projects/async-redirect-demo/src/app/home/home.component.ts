import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <h3>{{ description }}</h3>
    <h4>PR:</h4>
    <ul>
        @for (pr of prs; track pr) {
        <li><a [href]="pr" target="_blank">{{ pr }}</a></li>
        }
    </ul>
    <p>Please click the links on the navigation bar to experiment with the asynchronous redirectTo function.</p>
  `,
})
export default class HomeComponent {
  prs = [
    'https://github.com/angular/angular/pull/60863',
  ];
  description = 'RedirectTo function can return a Promise or an Observable.';
}
