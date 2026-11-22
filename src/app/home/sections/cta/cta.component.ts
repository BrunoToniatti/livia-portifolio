import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { EASE, reveal, rv } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { InViewDirective } from '../../../shared/in-view.directive';
import { CONTACT, whatsappLink } from '../../../shared/site.data';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [IconComponent, InViewDirective],
  template: `
    <section class="cta-wrap" id="agendar">
      <div class="container">
        <div class="cta" appInView #v="inView" [@card]="v.visible ? 'in' : 'out'">
          <span class="cta__orb cta__orb--1" aria-hidden="true"></span>
          <span class="cta__orb cta__orb--2" aria-hidden="true"></span>
          <span class="cta__shine" aria-hidden="true"></span>

          <span class="cta__script script" [@reveal]="rv(v.visible, 300)">o seu momento</span>
          <h2 class="cta__title" [@reveal]="rv(v.visible, 420)">
            Pronta para se sentir <em>ainda mais você?</em>
          </h2>
          <p class="cta__text" [@reveal]="rv(v.visible, 540)">
            Agende a sua avaliação e descubra o protocolo ideal para realçar a sua beleza natural.
          </p>
          <div class="cta__actions" [@reveal]="rv(v.visible, 660)">
            <a class="btn btn--light btn--lg" [href]="whatsapp" target="_blank" rel="noopener">
              <app-icon name="whatsapp" />
              Agendar pelo WhatsApp
            </a>
            <a class="cta__phone" [href]="whatsapp" target="_blank" rel="noopener">
              <app-icon name="phone" />
              {{ contact.phoneDisplay }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './cta.component.scss',
  animations: [
    reveal,
    // O cartão entra e, ao mesmo tempo, libera as animações internas em cascata.
    trigger('card', [
      state('out', style({ opacity: 0, transform: 'translateY(60px) scale(0.96)' })),
      state('in', style({ opacity: 1, transform: 'none' })),
      transition('out => in', group([
        animate(`1200ms ${EASE}`),
        query('@reveal', animateChild(), { optional: true }),
      ])),
    ]),
  ],
})
export class CtaComponent {
  readonly rv = rv;
  readonly contact = CONTACT;
  readonly whatsapp = whatsappLink();
}
