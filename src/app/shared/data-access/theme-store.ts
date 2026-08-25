import { computed, DOCUMENT, effect, inject, Service, signal } from '@angular/core';

@Service()
export class ThemeStore {
  private document = inject(DOCUMENT);
  private darkClass = 'dark' as const;
  private storageKey = 'app-theme' as const;
  private state = signal<ThemeState>(this.setupInitialState());

  darkTheme = computed(() => this.state().darkTheme);

  constructor() {
    effect(() => {
      const isDark = this.darkTheme();
      this.document.documentElement.classList.toggle(this.darkClass, isDark);
      localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
    });
  }

  toggleTheme() {
    this.state.update((s) => ({ ...s, darkTheme: !this.darkTheme() }));
  }

  private setupInitialState(): ThemeState {
    const stored = localStorage.getItem(this.storageKey);
    return {
      darkTheme: stored
        ? stored === this.darkClass
        : window.matchMedia('(prefers-color-scheme: dark)').matches,
    };
  }
}

export interface ThemeState {
  darkTheme: boolean;
}
