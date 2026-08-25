import { Component, computed, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  imports: [MatIcon, MatSlideToggle, FormsModule],
  selector: 'app-theme-slide-toggle',
  styleUrl: './theme-slide-toggle.scss',
  templateUrl: './theme-slide-toggle.html',
})
export class ThemeSlideToggle {
  darkTheme = model.required<boolean>();

  protected readonly toggleLabel = computed(
    () => `Switch to ${this.darkTheme() ? 'light' : 'dark'} mode`,
  );
}
