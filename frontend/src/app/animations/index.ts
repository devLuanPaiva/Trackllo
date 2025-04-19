import { animate, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('1000ms ease-out', style({ opacity: 1 })),
  ]),
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(20px)' }),
    animate(
      '600ms ease-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

export const spin = trigger('spin', [
  transition('* => *', [
    animate(
      '2s linear infinite',
      keyframes([
        style({ transform: 'rotate(0deg)' }),
        style({ transform: 'rotate(360deg)' }),
      ])
    ),
  ]),
]);

export const fadeSlide = trigger('fadeSlide', [
  state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
  transition(':enter', [
    animate(
      '300ms ease-out',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
  transition(':leave', [
    animate(
      '300ms ease-in',
      style({ opacity: 0, transform: 'translateY(-20px)' })
    ),
  ]),
]);

export const fadeInScale = trigger('fadeInScale', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0,9)' }),
    animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
]);

export const fadeInOut = trigger('fadeInOut', [
  state('void', style({ opacity: 0, transform: 'scale(0.95)' })),
  transition('void => *', [animate('300ms ease-in')]),
  transition('* => void', [
    animate('200ms ease-out', style({ opacity: 0, transform: 'scale(0.95)' })),
  ]),
]);

export const latterAnimation = trigger('letterAnimation', [
  transition(':enter', [
    query('span', [
      style({ opacity: 0, transform: 'translateY(-60px)' }),
      stagger('100ms', [
        animate(
          '600ms cubic-bezier(0.23, 1, 0.32, 1)',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          })
        ),
      ]),
    ]),
  ]),
]);

export const fadeDialog = trigger('fadeDialog', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.9)' }),
    animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
  ])
])
