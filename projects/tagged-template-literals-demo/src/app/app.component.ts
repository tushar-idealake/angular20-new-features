import { ChangeDetectionStrategy, Component, signal, VERSION } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  version = VERSION.full;
  description = 'Tagged Template Literals Demo';

  name = signal('Mary');
  greeting = signal('morning');

  greet(strings: TemplateStringsArray, name: string, greeting: string) {
    console.log(strings);
    return `${strings[0]} ${name}${strings[1]} ${greeting}${strings[2]}`;
  }
}
