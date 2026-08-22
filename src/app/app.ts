import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/ui/header';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalStore } from './shared/data-access/global-store';
import { Logo } from './shared/ui/logo';
import { ThemeSlideToggle } from './shared/ui/theme-slide-toggle';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Logo, ThemeSlideToggle],
  template: `
    <app-header>
      <app-logo />
      <app-theme-slide-toggle
        [darkTheme]="store.darkTheme()"
        (darkThemeChange)="store.toggleTheme()"
      />
    </app-header>

    <main class="main">
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background-color: light-dark(var(--neutral-100), var(--primary-900));
      transition: background-color 0.35s ease-in-out;

      .main {
        flex: 1;
      }
    }
  `,
})
export class App {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  protected store = inject(GlobalStore);

  constructor() {
    this.matIconRegistry.addSvgIconSetInNamespace(
      'custom',
      this.domSanitizer.bypassSecurityTrustResourceUrl('icons/icons.svg'),
    );
  }
}
