import { Component } from '@angular/core';
import { expand, reveal, rv } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { InViewDirective } from '../../../shared/in-view.directive';
import { FAQ, whatsappLink } from '../../../shared/site.data';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [IconComponent, InViewDirective],
  template: `
    <section class="section faq" id="duvidas">
      <div class="container faq__grid">
        <div class="faq__intro" appInView #h="inView">
          <span class="eyebrow" [@reveal]="rv(h.visible)">Dúvidas frequentes</span>
          <h2 class="section-title" [@reveal]="rv(h.visible, 120)">Tudo o que você quer <em>saber</em></h2>
          <p class="section-lead" [@reveal]="rv(h.visible, 240)">
            Não encontrou a sua pergunta? Me chama no WhatsApp, vou adorar te responder.
          </p>
          <div class="faq__cta" [@reveal]="rv(h.visible, 360)">
            <a class="btn btn--primary" [href]="whatsapp" target="_blank" rel="noopener">
              <app-icon name="message" />
              Tirar uma dúvida
            </a>
          </div>
        </div>

        <div class="faq__list" appInView #v="inView">
          @for (item of items; track item.q; let i = $index) {
            <div class="qa" [class.is-open]="open === i" [@reveal]="rv(v.visible, i * 90, 'translateY(30px)')">
              <h3>
                <button
                  type="button"
                  class="qa__q"
                  [id]="'faq-q-' + i"
                  [attr.aria-expanded]="open === i"
                  [attr.aria-controls]="'faq-a-' + i"
                  (click)="toggle(i)"
                >
                  <span>{{ item.q }}</span>
                  <span class="qa__icon"><app-icon name="plus" /></span>
                </button>
              </h3>
              <div
                class="qa__a"
                role="region"
                [id]="'faq-a-' + i"
                [attr.aria-labelledby]="'faq-q-' + i"
                [@expand]="open === i ? 'open' : 'closed'"
              >
                <p>{{ item.a }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './faq.component.scss',
  animations: [reveal, expand],
})
export class FaqComponent {
  readonly rv = rv;
  readonly items = FAQ;
  readonly whatsapp = whatsappLink('Olá, Dra. Lívia! Vim pelo site e tenho uma dúvida.');
  open: number | null = 0;

  toggle(i: number): void {
    this.open = this.open === i ? null : i;
  }
}
