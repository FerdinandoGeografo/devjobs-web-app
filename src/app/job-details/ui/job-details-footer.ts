import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Job } from '../../shared/models/job';

@Component({
  selector: 'app-job-details-footer',
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <div class="footer__content">
      <div class="footer__text">
        <h2 class="heading heading--md">{{ position() }}</h2>
        <p class="text">{{ company() }}</p>
      </div>
      <button matButton="filled">Apply Now</button>
    </div>
  `,
  styles: `
    :host {
      margin-top: 4.8rem;
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background-color: light-dark(var(--neutral-0), var(--primary-700));
      transition: background-color 0.35s ease-in-out;

      .footer {
        &__content {
          min-width: 73rem;
          padding: 2.3rem 0 2.2rem;
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
      }
    }
  `,
})
export class JobDetailsFooter {
  position = input.required<Job['position']>();
  company = input.required<Job['company']>();
}
