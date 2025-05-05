import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ComponentRef, inputBinding, outputBinding, signal, VERSION, viewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppLabelColorDirective } from './star-war/star-war-label.directive';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  template: `
    <h1>{{ version }} - {{ name }}!</h1>
    <h2>PR:</h2>
    <ol style="margin-bottom: 1rem;">
      <li><a href="https://github.com/angular/angular/pull/60137" target="_blank">
        https://github.com/angular/angular/pull/60137
      </a></li>
    </ol>
    <div class="container">
      <ng-container #vcr />
    </div>

    <ng-container [ngTemplateOutlet]="starwars" 
      [ngTemplateOutletContext]="{ items: jediFighters(), isSith: false  }" />
    
    <ng-container [ngTemplateOutlet]="starwars"
      [ngTemplateOutletContext]="{ items: sithFighters(), isSith: true }"
    />

    <ng-template let-items="items" let-isSith="isSith"
      #starwars>
      <select [ngModel]="items[0].id" #id="ngModel">
        @for (item of items; track item.id) {
          <option [ngValue]="item.id">{{ item.name }}</option>
        }
      </select>
      @let text = isSith ? 'Add a Sith' : 'Add a Jedi';
      <button (click)="addAJedi(id.value, isSith)">{{ text }}</button>
    </ng-template>
  `,
  styles: `
    .container {
      display: flex;
      flex-wrap: wrap;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly version = VERSION.full;
  readonly name = 'Support bindings and directives in dynamic component';
  
  vcr = viewChild.required('vcr', { read: ViewContainerRef });
  componentRefs = [] as ComponentRef<any>[];

  jediId = signal(1);
  sithId = signal(4);

  jediFighters = signal([
    { id: 1, name: 'Luke' },
    { id: 10, name: 'Obi Wan Kenobe' },
    { id: 20, name: 'Yoda' },
    { id: 51, name: 'Mace Windu' },
    { id: 52, name: 'Ki-Adi-Mundi' },
    { id: 53, name: 'Kit Fisto' },
    { id: 32, name: 'Qui-Gon Jinn' },
  ]);

  sithFighters = signal([
    { id: 4, name: 'Darth Vader' },
    { id: 44, name: 'Darth Maul' },
    { id: 21, name: 'Palpatine' },
    { id: 67, name: 'Dooku' },
  ]);

  async addAJedi(id: number, isSith = false) {
    const { AppStarWarCharacterComponent } = await import ('./star-war/star-war-character.component');
    const componentRef = this.vcr().createComponent(AppStarWarCharacterComponent, 
      {
        bindings: [
          inputBinding('id', () => id),
          inputBinding('isSith', () => isSith),
          outputBinding<string>('alertStarWars', (name) => alert(`${name} alerts the parent component`)),
        ],
        directives: [
          {
            type: AppLabelColorDirective,
            bindings: [
              inputBinding('spanClass', () => isSith ? 'red' : 'rebeccapurple')
            ]
          }
        ]
      }
    );
    this.componentRefs.push(componentRef);
  }

  ngOnDestroy(): void {
    if (this.componentRefs) {
      for (const ref of this.componentRefs) {
        ref.destroy();
      }
    }
  }
}
