import { Component, input } from '@angular/core';
import { Job } from '../../shared/models/job';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-details-header',
  imports: [MatButtonModule],
  template: `
    <div class="job__logo" [style.background]="job().logoBackground">
      <img [src]="job().logo" alt="{{ job().company }}'s logo image" />
    </div>
    <div class="job__content">
      <div class="job__text">
        <p class="heading heading--md">
          {{ job().company }}
        </p>
        <p class="text">{{ job().company.replace(' ', '-').toLowerCase() }}.com</p>
      </div>
      <a matButton="tonal" [href]="job().website" target="__blank"> Company Site </a>
    </div>
  `,
  styles: `
    :host {
      min-width: 73rem;
      display: flex;
      background: var(--neutral-0);
      border-radius: 6px;

      .job {
        &__logo {
          width: 14rem;
          height: 14rem;
          border-bottom-left-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            scale: 2;
          }
        }

        &__content {
          flex: 1;
          padding: 0 4.3rem 0 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        &__text {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;

          .heading {
            color: var(--primary-700);
          }

          .text {
            line-height: 1;
            color: var(--neutral-600)
          }
        }
      }
    }
  `,
})
export class JobDetailsHeader {
  job = input.required<Job>();
}
