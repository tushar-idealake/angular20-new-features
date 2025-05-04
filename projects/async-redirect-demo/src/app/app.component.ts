import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LINKS } from './app.link';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
