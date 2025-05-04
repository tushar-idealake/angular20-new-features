import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LINKS } from '../app.link';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  version = VERSION.full;
  name = 'Asynchronous Redirect Demo';
  links = LINKS;
}
