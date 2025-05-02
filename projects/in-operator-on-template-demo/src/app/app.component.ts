import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { Cat, Dog, Fish } from './animal.type';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  version = VERSION.full;
  prs = [
    'https://github.com/angular/angular/pull/58432',
  ];
  name = 'Support the in Operator in the Template Demo';
  description = 'Support in keyword with the same precedence as the other relational operators (<,>, <=, >=).';

  animals: (Cat | Dog | Fish)[] = [
    {
      noise: 'barks',
      run: 'a beach',
      swim: 'a swimming pool',
    },
    {
      noise: 'meows',
      jump: 'on the sofa',
    },
    {
      swim: 'an aquarium',
    },
    {
      noise: 'growls',
      run: 'a park',
      swim: 'a pond',
    },
  ]
}
