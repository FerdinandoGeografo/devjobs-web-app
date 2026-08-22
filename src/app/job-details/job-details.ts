import { Component, inject, input, effect, numberAttribute } from '@angular/core';
import { JobDetailsHeader } from './ui/job-details-header';
import { JobDetailsContent } from './ui/job-details-content';
import { JobDetailsFooter } from './ui/job-details-footer';
import { Job } from '../shared/models/job';
import { JobDetailsStore } from './data-access/job-details-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-details',
  imports: [JobDetailsHeader, JobDetailsContent, JobDetailsFooter],
  template: `
    @if (detailsStore.loading()) {
      <p>Loading...</p>
    } @else {
      <section class="job container container--md">
        @if (detailsStore.notFound()) {
          <p>No job found with id: {{ id() }}</p>
        } @else {
          @let job = detailsStore.job();
          <app-job-details-header [job]="job!" />
          <app-job-details-content [job]="job!" />
          <app-job-details-footer [position]="job!.position" [company]="job!.company" />
        }
      </section>
    }
  `,
  styles: `
    :host {
      .job {
        display: flex;
        flex-direction: column;
        gap: 3.2rem;
      }
    }
  `,
})
export class JobDetails {
  protected id = input(null, { transform: numberAttribute });

  private readonly router = inject(Router);
  protected readonly detailsStore = inject(JobDetailsStore);

  constructor() {
    effect(() => {
      const id = Number(this.id());

      if (Number.isNaN(id)) this.router.navigate(['/jobs'], { replaceUrl: true });

      this.detailsStore.setJobId(id);
    });
  }
}
