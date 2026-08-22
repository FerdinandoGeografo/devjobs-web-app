import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, effect, inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export const BREAKPOINTS_QUERY = {
  phone: '(max-width: 640px)',
  tablet: '(min-width: 641px) and (max-width: 1024px)',
  desktop: '(min-width: 1025px)',
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS_QUERY;

@Service()
export class BreakpointsStore {
  private readonly breakpointsObserver = inject(BreakpointObserver);

  private state = toSignal(this.breakpointsObserver.observe(Object.values(BREAKPOINTS_QUERY)), {
    requireSync: true,
  });

  readonly breakpoint = computed<Breakpoint>(() => {
    const { breakpoints } = this.state();
    if (breakpoints[BREAKPOINTS_QUERY.phone]) return 'phone';
    if (breakpoints[BREAKPOINTS_QUERY.tablet]) return 'tablet';
    return 'desktop';
  });

  readonly isPhone = computed(() => this.breakpoint() === 'phone');
  readonly isTablet = computed(() => this.breakpoint() === 'tablet');
  readonly isDesktop = computed(() => this.breakpoint() === 'desktop');

  constructor() {
    effect(() => console.log(this.breakpoint()));
  }
}
