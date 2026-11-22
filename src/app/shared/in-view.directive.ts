import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';

/**
 * Marca `visible = true` (uma única vez) quando o elemento entra na tela.
 * Uso: <div appInView #v="inView"> ... [@reveal]="rv(v.visible)"
 */
@Directive({
  selector: '[appInView]',
  standalone: true,
  exportAs: 'inView',
})
export class InViewDirective implements OnInit, OnDestroy {
  /** Quanto do fim da tela ignorar antes de disparar (ex.: '-15%'). */
  @Input() inViewOffset = '-12%';
  @Output() entered = new EventEmitter<void>();

  visible = false;

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      queueMicrotask(() => this.zone.run(() => this.show()));
      return;
    }

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.observer?.disconnect();
            this.zone.run(() => this.show());
          }
        },
        { threshold: 0, rootMargin: `0px 0px ${this.inViewOffset} 0px` },
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private show(): void {
    if (this.visible) return;
    this.visible = true;
    this.entered.emit();
  }
}
