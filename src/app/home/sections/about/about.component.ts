import { Component, NgZone, OnDestroy, inject } from '@angular/core';
import { curtain, reveal, rv } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { InViewDirective } from '../../../shared/in-view.directive';
import { CREDENTIALS } from '../../../shared/site.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IconComponent, InViewDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  animations: [reveal, curtain],
})
export class AboutComponent implements OnDestroy {
  readonly rv = rv;
  readonly credentials = CREDENTIALS;
  readonly yearsTarget = 8;
  years = 0;

  private readonly zone = inject(NgZone);
  private frame = 0;

  /** Conta de 0 até 8 quando a seção aparece. */
  startCounter(): void {
    const duration = 1800;
    const start = performance.now() + 600;
    this.zone.runOutsideAngular(() => {
      const tick = (now: number) => {
        const t = Math.min(Math.max((now - start) / duration, 0), 1);
        const value = Math.round((1 - Math.pow(1 - t, 3)) * this.yearsTarget);
        if (value !== this.years) this.zone.run(() => (this.years = value));
        if (t < 1) this.frame = requestAnimationFrame(tick);
      };
      this.frame = requestAnimationFrame(tick);
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }
}
