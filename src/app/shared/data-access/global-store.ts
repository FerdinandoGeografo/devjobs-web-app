import { computed, DOCUMENT, effect, inject, Service, signal } from '@angular/core';

@Service()
export class GlobalStore {
  private document = inject(DOCUMENT);
  private darkClass = 'dark' as const;
  private state = signal<GlobalState>(initialState);

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

export interface GlobalState {
  darkTheme: boolean;
}

const initialState: GlobalState = {
  darkTheme: false,
};
