import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/ui/header';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalStore } from './shared/data-access/global-store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <app-header [darkTheme]="store.darkTheme()" (themeToggled)="store.toggleTheme()" />

    <main class="main">
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      min-height: 100vh;
      display: block;
      background-color: light-dark(var(--neutral-100), var(--primary-900));
      transition: background-color 0.35s ease-in-out;

      .main {
        transform: translateY(-4.1rem);
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
