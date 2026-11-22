import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuAtivo = false;
 
  @ViewChild('navbar')    navbarEl!: ElementRef<HTMLElement>;
  @ViewChild('drawerNav') drawerEl!: ElementRef<HTMLElement>;
 
  private readonly SCROLL_THRESHOLD = 60; // px antes de trocar cor
 
  // ── Scroll: troca classe .scrolled + atualiza CSS var ───────────────────
  @HostListener('window:scroll')
  onScroll(): void {
    const scrolled = window.scrollY > this.SCROLL_THRESHOLD;
    this.navbarEl.nativeElement.classList.toggle('scrolled', scrolled);
  }
 
  // ── Resize: recalcula altura do drawer ──────────────────────────────────
  @HostListener('window:resize')
  onResize(): void {
    this.setDrawerHeight();
    if (window.innerWidth > 768 && this.menuAtivo) {
      this.closeMenu();
    }
  }
 
  // ── Fecha drawer com ESC ─────────────────────────────────────────────────
  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.menuAtivo) this.closeMenu();
  }
 
  ngOnInit(): void {}
 
  ngAfterViewInit(): void {
    // Passa a altura real do navbar para o CSS (usado como padding-top do drawer)
    this.setNavbarHeightVar();
    this.setDrawerHeight();
  }
 
  // ── Helpers ──────────────────────────────────────────────────────────────
  private setNavbarHeightVar(): void {
    const h = this.navbarEl.nativeElement.offsetHeight;
    document.documentElement.style.setProperty('--navbar-height', `${h}px`);
  }
 
  private setDrawerHeight(): void {
    // Drawer ocupa da topo até o fim da viewport.
    // O conteúdo interno começa após o navbar (via padding-top no SCSS).
    const total = window.innerHeight * 0.65; // 65 vh — ajuste se quiser full
    document.documentElement.style.setProperty('--drawer-height', `${total}px`);
  }
 
  // ── Toggle / Close ────────────────────────────────────────────────────────
  toggleMenu(): void {
    this.menuAtivo ? this.closeMenu() : this.openMenu();
  }
 
  private openMenu(): void {
    this.setNavbarHeightVar();
    this.setDrawerHeight();
    this.menuAtivo = true;
    document.body.style.overflow = 'hidden'; // trava scroll do body
  }
 
  private closeMenu(): void {
    this.menuAtivo = false;
    document.body.style.overflow = '';
  }
 
  // ── Scroll suave para seção ───────────────────────────────────────────────
  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.closeMenu();
 
    // Marca link ativo
    const links = document.querySelectorAll('.navbar .menu a');
    links.forEach(a => a.classList.remove('active'));
    (event.target as HTMLElement).classList.add('active');
 
    const el = document.getElementById(sectionId);
    if (!el) return;
 
    const navH = this.navbarEl.nativeElement.offsetHeight;
    const top  = el.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  }
 
  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }
}
