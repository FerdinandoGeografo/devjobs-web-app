import { Component, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  imports: [MatIcon, MatSlideToggle, FormsModule, ReactiveFormsModule],
  selector: 'app-theme-slide-toggle',
  styles: `
    :host {
      display: flex;
      align-items: center;
      gap: 1.6rem;

      .mat-icon.icon {
        &--sun {
          width: 2rem;
          height: 1.8rem;
        }

        &--moon {
          width: 1.2rem;
          height: 1.2rem;
          font-size: 1.2rem;
        }
      }
    }
  `,
  template: `
    <mat-icon class="icon icon--sun" svgIcon="custom:sun" />
    <mat-slide-toggle disableRipple hideIcon [(ngModel)]="darkTheme" />
    <mat-icon class="icon icon--moon" svgIcon="custom:moon" />
  `,
})
export class ThemeSlideToggle {
  darkTheme = model.required<boolean>();
}
