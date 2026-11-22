import { Component } from '@angular/core';
import { reveal, rv } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { InViewDirective } from '../../../shared/in-view.directive';
import { DIFFERENTIALS } from '../../../shared/site.data';

@Component({
  selector: 'app-differentials',
  standalone: true,
  imports: [IconComponent, InViewDirective],
  template: `
    <section class="section differentials" id="diferenciais">
      <div class="container">
        <header class="section-head" appInView #h="inView">
          <span class="eyebrow" [@reveal]="rv(h.visible)">Por que a Dra. Lívia</span>
          <h2 class="section-title" [@reveal]="rv(h.visible, 120)">Cuidado que se vê <em>no detalhe</em></h2>
        </header>

        <div class="grid" appInView #v="inView">
          @for (d of items; track d.title; let i = $index) {
            <div class="cell" [@reveal]="rv(v.visible, i * 120, 'translateY(50px)', 1000)">
              <article class="card">
                <span class="card__num">0{{ i + 1 }}</span>
                <span class="card__icon"><app-icon [name]="d.icon" /></span>
                <h3 class="card__title">{{ d.title }}</h3>
                <p class="card__text">{{ d.text }}</p>
              </article>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './differentials.component.scss',
  animations: [reveal],
})
export class DifferentialsComponent {
  readonly rv = rv;
  readonly items = DIFFERENTIALS;
}
