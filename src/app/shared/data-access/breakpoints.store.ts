import { BreakpointObserver } from '@angular/cdk/layout';
import { computed, inject, Service } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

export const BREAKPOINTS_QUERY = {
  phone: '(max-width: 736px)',
  tablet: '(min-width: 737px) and (max-width: 1240px)',
  desktop: '(min-width: 1241px)',
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
}
