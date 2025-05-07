import { ChangeDetectionStrategy, Component, VERSION } from '@angular/core';
import { Cat, Dog, Fish } from './animal.type';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss', 
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
      name: 'dog',
      noise: 'barks',
      run: 'a beach',
      swim: 'a swimming pool',
    },
    {
      name: 'Cat',
      noise: 'meows',
      jump: 'on the sofa',
    },
    {
      name: 'Fish',
      swim: 'an aquarium',
    },
    {
      name: 'Hound',
      noise: 'growls',
      run: 'a forest',
      swim: 'a pond',
    },
  ]
}
