import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ThemeStore } from './shared/data-access/theme-store';
import { Header } from './shared/ui/header/header';
import { Logo } from './shared/ui/logo/logo';
import { ThemeSlideToggle } from './shared/ui/theme-slide-toggle/theme-slide-toggle';
import { Footer } from './shared/ui/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Logo, ThemeSlideToggle, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer = inject(DomSanitizer);
  protected store = inject(ThemeStore);

  constructor() {
    this.matIconRegistry.addSvgIconSetInNamespace(
      'custom',
      this.domSanitizer.bypassSecurityTrustResourceUrl('icons/icons.svg'),
    );
  }
}
