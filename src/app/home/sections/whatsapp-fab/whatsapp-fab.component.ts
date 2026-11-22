import { Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { pop } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { whatsappLink } from '../../../shared/site.data';

/** Botão flutuante do WhatsApp: aparece depois que a pessoa passa do topo. */
@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [IconComponent],
  template: `
    @if (visible) {
      <a class="fab" [href]="whatsapp" target="_blank" rel="noopener" aria-label="Agendar pelo WhatsApp" @pop>
        <span class="fab__pulse" aria-hidden="true"></span>
        <span class="fab__label">Agende agora</span>
        <span class="fab__icon"><app-icon name="whatsapp" /></span>
      </a>
    }
  `,
  styleUrl: './whatsapp-fab.component.scss',
  animations: [pop],
})
export class WhatsappFabComponent implements OnInit, OnDestroy {
  readonly whatsapp = whatsappLink();
  visible = false;

  private readonly zone = inject(NgZone);
  private readonly onScroll = () => {
    const visible = window.scrollY > window.innerHeight * 0.7;
    if (visible !== this.visible) this.zone.run(() => (this.visible = visible));
  };

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => window.addEventListener('scroll', this.onScroll, { passive: true }));
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }
}
