import { Component, ChangeDetectionStrategy, VERSION, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { navLinks } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <h1>{{ version }} - {{ name }}!</h1>
    <h2>{{ description }}</h2>
    <h2>PRs:</h2>
    <ol style="margin-bottom: 1rem;">
      @for (pr of this.prs(); track pr) {
        <li><a [href]="pr" target="_blank">{{ pr }}</a></li>
      }
    </ol>
    <h3>The demos throw error when the guess is 5.</h3>
    <app-navbar [navLinks]="navLinks" />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  prs = signal([
    'https://github.com/angular/angular/pull/60442',
    'https://github.com/angular/angular/pull/60397'
  ]);

  name = 'toSignal Handles Uncaught Exception';
  description = 'toSignal removes rejectErrors option';
  navLinks = navLinks;
}
