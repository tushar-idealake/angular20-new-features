import { ChangeDetectionStrategy, Component, ComponentRef, signal, VERSION, viewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <h1>{{ version }} - {{ name }}!</h1>
    <h2>PR:</h2>
    <ol style="margin-bottom: 1rem;">
      <li>https://github.com/angular/angular/pull/59947</li>
    </ol>
    <div class="container">
      <ng-container #vcr />
    </div>
    <select [(ngModel)]="jediId">
      <option value="1">Luke</option>
      <option value="10">Obi Wan Kenobe</option>
      <option value="20">Yoda</option>
      <option value="51">Mace Windu</option>
      <option value="52">Ki-Adi-Mundi</option>
      <option value="53">Kit Fisto</option>
      <option value="32">Qui-Gon Jinn</option>
    </select>
    <button (click)="addAJedi(jediId())">Add a Jedi</button>

    <select [(ngModel)]="sithId">
      <option value="4">Darth Vader</option>
      <option value="44">Darth Maul</option>
      <option value="21">Palpatine</option>
      <option value="67">Dooku</option>
    </select>
    <button (click)="addAJedi(sithId(), true)">Add a Sith</button>
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
  readonly name = 'Support bindings and directives in dyanmic component';
  
  vcr = viewChild.required('vcr', { read: ViewContainerRef });
  componentRefs = [] as ComponentRef<any>[];

  jediId = signal(1);
  sithId = signal(4);

  async addAJedi(id: number, isSith = false) {
    const { AppStarWarCharacterComponent } = await import ('./star-war/star-war-character.component');
    AppStarWarCharacterComponent
    const componentRef = this.vcr().createComponent(AppStarWarCharacterComponent);
    componentRef.setInput('id', id);
    componentRef.setInput('isSith', isSith);
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
