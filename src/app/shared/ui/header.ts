import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header class="header">
      <picture class="header__background">
        <source media="(max-width: 40em)" srcset="/images/mobile/bg-pattern-header.svg" />

        <source media="(max-width: 64em)" srcset="/images/tablet/bg-pattern-header.svg" />

        <img src="/images/desktop/bg-pattern-header.svg" alt="" />
      </picture>
      <div class="header__container container container--lg">
        <ng-content />
      </div>
    </header>
  `,
  styles: `
    @use '../../../../public/scss/_media.scss' as *;

    :host {
      .header {
        position: relative;
        isolation: isolate;

        &__background {
          position: absolute;
          inset: 0 0 auto;
          width: 100%;
          height: 16.2rem;
          z-index: -1;

          img {
            width: 100%;
            height: 100%;
          }
        }

        &__container {
          padding-top: 4.5rem;
          padding-bottom: 8.5rem;
          display: flex;
          align-items: start;
          justify-content: space-between;
        }

        @include respond(tablet) {
          &__background {
            height: 16rem;

            img {
              object-fit: cover;
            }
          }

          &__container {
            padding-top: 4.2rem;
            padding-bottom: 8.6rem;
            align-items: center;
          }
        }

        @include respond(phone) {
          &__background {
            height: 13.6rem;
          }

          &__container {
            padding-top: 3.2rem;
            padding-bottom: 7.2rem;
          }
        }
      }
    }
  `,
})
export class Header {}
