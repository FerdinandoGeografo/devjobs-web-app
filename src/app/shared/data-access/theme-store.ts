import { computed, DOCUMENT, effect, inject, Service, signal } from '@angular/core';

@Service()
export class ThemeStore {
  private document = inject(DOCUMENT);
  private darkClass = 'dark' as const;
  private state = signal<ThemeState>(initialState);

  darkTheme = computed(() => this.state().darkTheme);

  constructor() {
    effect(() => {
      const isDark = this.darkTheme();
      isDark
        ? this.document.documentElement.classList.add(this.darkClass)
        : this.document.documentElement.classList.remove(this.darkClass);
    });
  }

  toggleTheme() {
    this.state.update((s) => ({ ...s, darkTheme: !this.darkTheme() }));
  }
}

export interface ThemeState {
  darkTheme: boolean;
}

const initialState: ThemeState = {
  darkTheme: window.matchMedia('(prefers-color-scheme: dark)').matches,
};
