import { Component } from '@angular/core';
import { panelSwap, reveal, rv } from '../../../shared/animations';
import { IconComponent } from '../../../shared/icon.component';
import { InViewDirective } from '../../../shared/in-view.directive';
import { PROCEDURES, Procedure, whatsappLink } from '../../../shared/site.data';

@Component({
  selector: 'app-procedures',
  standalone: true,
  imports: [IconComponent, InViewDirective],
  templateUrl: './procedures.component.html',
  styleUrl: './procedures.component.scss',
  animations: [reveal, panelSwap],
})
export class ProceduresComponent {
  readonly rv = rv;
  readonly procedures = PROCEDURES;
  readonly links = Object.fromEntries(
    PROCEDURES.map((p) => [
      p.id,
      whatsappLink(`Olá, Dra. Lívia! Vim pelo site e gostaria de agendar uma avaliação de ${p.name}.`),
    ]),
  );

  index = 0;
  private touchX = 0;

  get current(): Procedure {
    return this.procedures[this.index];
  }

  /** Lista com um único item: trocar o id recria o painel e dispara :enter/:leave. */
  get currentList(): Procedure[] {
    return [this.current];
  }

  select(i: number): void {
    const total = this.procedures.length;
    this.index = (i + total) % total;
  }

  onTabKey(event: KeyboardEvent, i: number): void {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(event.key in keys)) return;
    event.preventDefault();
    this.select(i + keys[event.key]);
    const tabs = (event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs?.[this.index]?.focus();
  }

  onTouchStart(event: TouchEvent): void {
    this.touchX = event.changedTouches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const delta = event.changedTouches[0].clientX - this.touchX;
    if (Math.abs(delta) > 60) this.select(this.index + (delta < 0 ? 1 : -1));
  }
}
