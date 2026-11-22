import { Component } from '@angular/core';
import { reveal, rv } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { InViewDirective } from '../../../shared/in-view.directive';
import { STEPS, whatsappLink } from '../../../shared/site.data';
import { animate, state, style, transition, trigger } from '@angular/animations';

/** A linha da jornada "se desenha" ligando as etapas. */
const lineGrow = trigger('lineGrow', [
  state('out', style({ clipPath: 'inset(0% 100% 100% 0%)' })),
  state('in', style({ clipPath: 'inset(0% 0% 0% 0%)' })),
  transition('out => in', animate('1800ms 300ms cubic-bezier(0.65, 0, 0.35, 1)')),
]);

@Component({
  selector: 'app-journey',
  standalone: true,
  imports: [IconComponent, InViewDirective],
  template: `
    <section class="section journey" id="jornada">
      <div class="journey__glow" aria-hidden="true"></div>
      <div class="container">
        <header class="section-head" appInView #h="inView">
          <span class="eyebrow" [@reveal]="rv(h.visible)">Como funciona</span>
          <h2 class="section-title" [@reveal]="rv(h.visible, 120)">
            Da primeira mensagem <em>ao resultado</em>
          </h2>
          <p class="section-lead" [@reveal]="rv(h.visible, 240)">
            Um caminho simples, acolhedor e sem pressa, com você acompanhada em cada etapa.
          </p>
        </header>

        <div class="steps" appInView #v="inView">
          <span class="steps__line" aria-hidden="true" [@lineGrow]="v.visible ? 'in' : 'out'"></span>
          <ol class="steps__list">
            @for (s of steps; track s.title; let i = $index) {
              <li class="step" [@reveal]="rv(v.visible, 300 + i * 380, 'translateY(40px)', 1000)">
                <span class="step__dot">
                  <app-icon [name]="s.icon" />
                  <span class="step__n">{{ i + 1 }}</span>
                </span>
                <h3 class="step__title">{{ s.title }}</h3>
                <p class="step__text">{{ s.text }}</p>
              </li>
            }
          </ol>
        </div>

        <div class="journey__cta" appInView #c="inView" [@reveal]="rv(c.visible, 200)">
          <a class="btn btn--light btn--lg" [href]="whatsapp" target="_blank" rel="noopener">
            <app-icon name="whatsapp" />
            Começar pelo passo 1
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './journey.component.scss',
  animations: [reveal, lineGrow],
})
export class JourneyComponent {
  readonly rv = rv;
  readonly steps = STEPS;
  readonly whatsapp = whatsappLink();
}
