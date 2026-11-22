import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { menuOverlay } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { CONTACT, NAV, whatsappLink } from '../../../shared/site.data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  animations: [menuOverlay],
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('progress') progressEl!: ElementRef<HTMLElement>;

  readonly nav = NAV;
  readonly contact = CONTACT;
  readonly whatsapp = whatsappLink();

  scrolled = false;
  menuOpen = false;
  active = '';

  private readonly zone = inject(NgZone);
  private readonly onScroll = () => this.update();

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
      requestAnimationFrame(this.onScroll);
    });
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    document.body.style.overflow = '';
  }

  toggleMenu(): void {
    this.setMenu(!this.menuOpen);
  }

  closeMenu(): void {
    this.setMenu(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  private setMenu(open: boolean): void {
    this.menuOpen = open;
    document.body.style.overflow = open ? 'hidden' : '';
  }

  /** Roda fora da zona do Angular e só volta para ela quando algo muda. */
  private update(): void {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progressEl.nativeElement.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

    const scrolled = y > 24;
    const line = window.innerHeight * 0.4;
    let active = '';
    for (const item of this.nav) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= line) active = item.id;
    }
    const closeMenu = this.menuOpen && window.innerWidth >= 960;

    if (scrolled !== this.scrolled || active !== this.active || closeMenu) {
      this.zone.run(() => {
        this.scrolled = scrolled;
        this.active = active;
        if (closeMenu) this.closeMenu();
      });
    }
  }
}
