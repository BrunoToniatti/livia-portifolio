import { Component } from '@angular/core';
import { AboutComponent } from './sections/about/about.component';
import { CtaComponent } from './sections/cta/cta.component';
import { DifferentialsComponent } from './sections/differentials/differentials.component';
import { FaqComponent } from './sections/faq/faq.component';
import { FooterComponent } from './sections/footer/footer.component';
import { HeaderComponent } from './sections/header/header.component';
import { HeroComponent } from './sections/hero/hero.component';
import { JourneyComponent } from './sections/journey/journey.component';
import { MarqueeComponent } from './sections/marquee/marquee.component';
import { ProceduresComponent } from './sections/procedures/procedures.component';
import { WhatsappFabComponent } from './sections/whatsapp-fab/whatsapp-fab.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    MarqueeComponent,
    AboutComponent,
    ProceduresComponent,
    DifferentialsComponent,
    JourneyComponent,
    FaqComponent,
    CtaComponent,
    FooterComponent,
    WhatsappFabComponent,
  ],
  template: `
    <app-header />
    <main>
      <app-hero />
      <app-marquee />
      <app-about />
      <app-procedures />
      <app-differentials />
      <app-journey />
      <app-faq />
      <app-cta />
    </main>
    <app-footer />
    <app-whatsapp-fab />
  `,
})
export class HomeComponent {}
