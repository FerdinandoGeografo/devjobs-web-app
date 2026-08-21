import { Component, computed, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { JobDetailsHeader } from './ui/job-details-header';
import { JobDetailsContent } from './ui/job-details-content';
import { JobDetailsFooter } from './ui/job-details-footer';
import { Job } from '../shared/models/job';
import { JobsStore } from '../jobs/data-access/jobs-store';

@Component({
  selector: 'app-job-details',
  imports: [JobDetailsHeader, JobDetailsContent, JobDetailsFooter],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    @if (job()) {
      <section class="job">
        <app-job-details-header [job]="job()" />
        <app-job-details-content [job]="job()" />
        <app-job-details-footer [position]="job()!.position" [company]="job()!.company" />
      </section>
    }
  `,
  styles: `
    :host {
      .job {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3.2rem;
      }
    }
  `,
})
export class JobDetails {
  protected id = input.required<Job['id']>();
  protected jobsStore = inject(JobsStore);

  job = computed(() => this.jobsStore.jobs().find((j) => j.id === +this.id())!);
}
