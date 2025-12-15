import { Component, input } from '@angular/core';
import { Job } from '../../shared/models/job';
import { MatAnchor } from '@angular/material/button';
import { JobDetailsList } from './job-details-list';

@Component({
  selector: 'app-job-details-content',
  imports: [MatAnchor, JobDetailsList],
  template: `
    <article class="job">
      <div class="job__heading-box">
        <div class="job__text">
          <div class="job__data">
            <p class="text">{{ job().postedAt }}</p>
            <div aria-hidden="true"></div>
            <p class="text">{{ job().contract }}</p>
          </div>
          <h1 class="job__position heading heading--xl">{{ job().position }}</h1>
          <p class="job__location heading heading--sm">{{ job().location }}</p>
        </div>
        <button matButton="filled">Apply Now</button>
      </div>

      <p class="text">
        {{ job().description }}
      </p>

      <app-job-details-list title="Requirements" [jobMetadata]="job().requirements" />
      <app-job-details-list
        title="What You Will Do"
        [jobMetadata]="job().role"
        bulletMode="numeric"
      />
    </article>
  `,
  styles: `
    :host {
      max-width: 73rem;

      .job {
        padding: 4.8rem 4.3rem 4.8rem 4.8rem;
        background: var(--neutral-0);
        border-radius: 6px;
        display: flex;
        flex-direction: column;
        gap: 4rem;

        .text {
          color: var(--neutral-600);
        }

        &__heading-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
        }

        &__text {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        &__data {
          height: 1.9rem;
          display: flex;
          align-items: start;
          gap: 1.2rem;
          color: var(--neutral-600);

          .text {
            line-height: 1;
          }

          div {
            height: 4px;
            width: 4px;
            border-radius: 50%;
            margin-top: 8px;
            background: currentColor;
          }
        }

        &__position {
          line-height: 1;
          color: var(--primary-700);
          margin-bottom: 6px;
        }

        &__location {
          color: var(--primary-400);
        }
      }
    }
  `,
})
export class JobDetailsContent {
  job = input.required<Job>();
}
