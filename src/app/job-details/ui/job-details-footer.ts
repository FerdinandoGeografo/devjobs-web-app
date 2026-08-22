import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Job } from '../../shared/models/job';

@Component({
  selector: 'app-job-details-footer',
  imports: [MatButtonModule],
  template: `
    <footer class="footer__content">
      <div class="footer__text">
        <h2 class="heading heading--md">{{ position() }}</h2>
        <p class="text">{{ company() }}</p>
      </div>
      <button class="btn btn--primary" matButton="filled">Apply Now</button>
    </footer>
  `,
  styles: `
    @use '../../../../public/scss/_media.scss' as *;

    :host {
      position: fixed;
      inset: auto 0 0 0;
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background-color: light-dark(var(--neutral-0), var(--primary-700));
      transition: background-color 0.35s ease-in-out;

      .footer {
        &__content {
          max-width: 80rem;
          width: 100%;
          padding: 2.3rem 3.5rem 2.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        &__text {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;

          .heading,
          .text {
            line-height: 1;
          }

          .heading {
            color: light-dark(var(--primary-700), var(--neutral-0));
            transition: color 0.35s ease-in-out;
          }

          .text {
            color: var(--neutral-600);
          }
        }

        @include respond(tablet) {
          padding-inline: 3.95rem;
        }

        @include respond(phone) {
          padding: 2.5rem 2.4rem 2.3rem;

          &__content {
            & > * {
              flex: 1;
            }
          }

          &__text {
            display: none;
          }
        }
      }
    }
  `,
})
export class JobDetailsFooter {
  position = input.required<Job['position']>();
  company = input.required<Job['company']>();
}
