import { Component, inject, input, effect, booleanAttribute } from '@angular/core';
import { Router } from '@angular/router';

import { IJobsFilters, JobsStore } from './data-access/jobs-store';
import { JobsList } from './ui/jobs-list/jobs-list';
import { JobsFilters } from './ui/jobs-filters/jobs-filters';

@Component({
  selector: 'app-jobs',
  imports: [JobsFilters, JobsList],
  templateUrl: `./jobs.html`,
  styleUrl: './jobs.scss',
})
export class Jobs {
  protected readonly router = inject(Router);
  protected readonly jobsStore = inject(JobsStore);

  readonly query = input<string>();
  readonly location = input<string>();
  readonly fullTimeOnly = input(false, {
    transform: booleanAttribute,
  });

  constructor() {
    effect(() => {
      const filter: IJobsFilters = {
        query: this.query() ?? '',
        location: this.location() ?? '',
        fullTimeOnly: this.fullTimeOnly(),
      };

      this.jobsStore.setFilter(filter);
    });
  }
}
