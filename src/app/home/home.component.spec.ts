import { TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
  });

  it('renderiza todas as seções navegáveis', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    for (const id of ['inicio', 'sobre', 'procedimentos', 'jornada', 'duvidas']) {
      expect(el.querySelector(`#${id}`)).withContext(id).not.toBeNull();
    }
  });

  it('todo link de agendamento aponta para o WhatsApp correto', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const links = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLAnchorElement>('a[href*="wa.me"]'),
    );
    expect(links.length).toBeGreaterThan(3);
    for (const a of links) {
      expect(a.href).toContain('https://wa.me/5511946070726');
    }
  });

  it('troca o procedimento exibido ao clicar em outra aba', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const tabs = el.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs[2].click();
    fixture.detectChanges();
    expect(tabs[2].getAttribute('aria-selected')).toBe('true');
    expect(el.querySelector('.panel__title')?.textContent).toContain('Preenchimento Labial');
  });
});
