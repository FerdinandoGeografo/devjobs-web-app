import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatSlideToggleModule],
  template: `
    <header class="header">
      <div class="header__container">
        <img src="images/desktop/logo.svg" alt="Devjobs app logo image" />
        <div class="header__slider-box">
          <mat-icon svgIcon="custom:sun" />
          <mat-slide-toggle
            disableRipple
            hideIcon
            [checked]="darkTheme()"
            (change)="themeToggled.emit()"
          />
          <mat-icon svgIcon="custom:moon" />
        </div>
      </div>
    </header>
  `,
  styles: `
    :host {
      .header {
        background-image: url('/images/desktop/bg-pattern-header.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: top center;

        &__container {
          padding: 4.5rem 16.5rem 8.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        &__slider-box {
          display: flex;
          align-items: center;
          gap: 1.6rem;

          .mat-icon {
            &[svgIcon="custom:sun"] {
              width: 2rem;
              height: 1.86rem;
            }
            &[svgIcon="custom:moon"] {
              width: 1.2rem;
              height: 1.2rem;
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  `,
})
export class Header {
  darkTheme = input.required<boolean>();
  themeToggled = output<void>();
}
