import { Component } from '@angular/core';
import { PROCEDURES } from '../../../shared/site.data';

@Component({
  selector: 'app-marquee',
  standalone: true,
  template: `
    <div class="marquee" aria-hidden="true">
      <div class="marquee__track">
        @for (copy of copies; track $index) {
          <div class="marquee__group">
            @for (name of names; track name) {
              <span class="marquee__item">{{ name }}</span>
              <span class="marquee__star">✦</span>
            }
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './marquee.component.scss',
})
export class MarqueeComponent {
  readonly names = [...PROCEDURES.map((p) => p.name), 'Resultado natural'];
  readonly copies = [0, 1];
}
