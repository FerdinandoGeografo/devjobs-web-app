import { Component, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  imports: [MatIcon, MatSlideToggle, FormsModule, ReactiveFormsModule],
  selector: 'app-theme-slide-toggle',
  styleUrl: './theme-slide-toggle.scss',
  templateUrl: './theme-slide-toggle.html',
})
export class ThemeSlideToggle {
  darkTheme = model.required<boolean>();
}
