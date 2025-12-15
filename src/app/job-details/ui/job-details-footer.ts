import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Job } from '../../shared/models/job';

@Component({
  selector: 'app-job-details-footer',
  imports: [MatButtonModule],
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
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      background: var(--neutral-0);

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

          .heading, .text {
            line-height: 1;
          }

          .heading {
            color: var(--primary-700);
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
