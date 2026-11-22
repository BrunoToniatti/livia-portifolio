import {
  animate,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

/**
 * Revela um elemento quando ele entra na tela.
 * Uso: [@reveal]="rv(v.visible, delay, from, duration)"
 */
export const reveal = trigger('reveal', [
  state('out', style({ opacity: 0, transform: '{{ from }}' }), {
    params: { from: 'translateY(36px)' },
  }),
  state('in', style({ opacity: 1, transform: 'none' })),
  transition('out => in', animate(`{{ duration }}ms {{ delay }}ms ${EASE}`), {
    params: { duration: 900, delay: 0 },
  }),
]);

export interface RevealBinding {
  value: 'in' | 'out';
  params: { delay: number; from: string; duration: number };
}

export function rv(
  visible: boolean,
  delay = 0,
  from = 'translateY(36px)',
  duration = 900,
): RevealBinding {
  return { value: visible ? 'in' : 'out', params: { delay, from, duration } };
}

/** Cortina vertical que revela uma foto, com leve zoom-out da imagem. */
export const curtain = trigger('curtain', [
  state('out', style({ clipPath: 'inset(100% 0% 0% 0%)' })),
  state('in', style({ clipPath: 'inset(0% 0% 0% 0%)' })),
  transition('out => in', [
    group([
      animate(`1500ms {{ delay }}ms ${EASE}`),
      query(
        'img',
        [
          style({ transform: 'scale(1.3)' }),
          animate(`2200ms {{ delay }}ms ${EASE}`, style({ transform: 'scale(1)' })),
        ],
        { optional: true },
      ),
    ]),
  ], { params: { delay: 200 } }),
]);

/** Desenha um traço SVG (path com pathLength="1"). */
export const draw = trigger('draw', [
  state('out', style({ strokeDashoffset: 1 })),
  state('in', style({ strokeDashoffset: 0 })),
  transition('out => in', animate(`1400ms {{ delay }}ms ${EASE}`), { params: { delay: 0 } }),
]);

/** Troca animada do painel de procedimento. */
export const panelSwap = trigger('panelSwap', [
  transition('* => *', [
    query(':enter', [style({ opacity: 0 })], { optional: true }),
    group([
      query(
        ':leave',
        [animate(`380ms ${EASE}`, style({ opacity: 0, transform: 'translateX(-40px)' }))],
        { optional: true },
      ),
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateX(48px)' }),
          animate(`700ms 180ms ${EASE}`, style({ opacity: 1, transform: 'none' })),
        ],
        { optional: true },
      ),
      query(
        ':enter .stg',
        [
          style({ opacity: 0, transform: 'translateY(22px)' }),
          stagger(70, [animate(`650ms 320ms ${EASE}`, style({ opacity: 1, transform: 'none' }))]),
        ],
        { optional: true },
      ),
      query(
        ':enter .proc-media__img',
        [
          style({ transform: 'scale(1.18)', filter: 'blur(6px)' }),
          animate(`1200ms 150ms ${EASE}`, style({ transform: 'scale(1)', filter: 'blur(0px)' })),
        ],
        { optional: true },
      ),
    ]),
  ]),
]);

/** Abre e fecha conteúdo com altura automática (acordeão). */
export const expand = trigger('expand', [
  state('closed', style({ height: 0, opacity: 0, visibility: 'hidden' })),
  state('open', style({ height: '*', opacity: 1, visibility: 'visible' })),
  transition('closed <=> open', animate(`520ms ${EASE}`)),
]);

/** Menu mobile em tela cheia, com links em cascata. */
export const menuOverlay = trigger('menuOverlay', [
  transition(':enter', [
    style({ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 38px)' }),
    group([
      animate(`700ms ${EASE}`, style({ opacity: 1, clipPath: 'circle(150% at calc(100% - 44px) 38px)' })),
      query(
        '.mm-item',
        [
          style({ opacity: 0, transform: 'translateY(28px)' }),
          stagger(70, [animate(`600ms 200ms ${EASE}`, style({ opacity: 1, transform: 'none' }))]),
        ],
        { optional: true },
      ),
    ]),
  ]),
  transition(':leave', [
    animate(`450ms ${EASE}`, style({ opacity: 0, clipPath: 'circle(0% at calc(100% - 44px) 38px)' })),
  ]),
]);

/** Botão flutuante entrando e saindo com "pop". */
export const pop = trigger('pop', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.4) translateY(30px)' }),
    animate(`600ms ${EASE}`, style({ opacity: 1, transform: 'none' })),
  ]),
  transition(':leave', [
    animate(`300ms ${EASE}`, style({ opacity: 0, transform: 'scale(0.4) translateY(30px)' })),
  ]),
]);
