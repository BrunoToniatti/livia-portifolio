import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, ViewChild, inject } from '@angular/core';
import { curtain, draw, reveal, rv } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { InViewDirective } from '../../../shared/in-view.directive';
import { whatsappLink } from '../../../shared/site.data';

interface Word {
  text: string;
  em?: boolean;
  delay: number;
}

const LINES: { text: string; em?: boolean }[][] = [
  [{ text: 'Você' }, { text: 'no' }, { text: 'espelho,' }],
  [{ text: 'só' }, { text: 'que' }, { text: 'ainda', em: true }, { text: 'mais', em: true }],
];

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent, InViewDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  animations: [reveal, curtain, draw],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('hero', { static: true }) heroEl!: ElementRef<HTMLElement>;

  readonly rv = rv;
  readonly whatsapp = whatsappLink();

  /** Cada palavra do título entra em cascata. */
  readonly lines: Word[][] = (() => {
    let i = 0;
    return LINES.map((line) => line.map((w) => ({ ...w, delay: 250 + i++ * 90 })));
  })();
  readonly accentDelay = 250 + 7 * 90 + 60;

  private readonly zone = inject(NgZone);
  private frame = 0;

  /** Parallax suave nos elementos flutuantes, só com mouse. */
  private readonly onPointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => {
      const el = this.heroEl.nativeElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    });
  };

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() =>
      this.heroEl.nativeElement.addEventListener('pointermove', this.onPointer, { passive: true }),
    );
  }

  ngOnDestroy(): void {
    this.heroEl.nativeElement.removeEventListener('pointermove', this.onPointer);
    cancelAnimationFrame(this.frame);
  }
}
