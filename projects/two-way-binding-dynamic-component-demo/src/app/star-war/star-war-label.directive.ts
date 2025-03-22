import { Directive, input } from '@angular/core';

@Directive({
    selector: '[appLabelColorDirective]',
    host: {
        '[class]': 'spanClass()'
    }
})
export class AppLabelColorDirective {
    spanClass = input('red');
}