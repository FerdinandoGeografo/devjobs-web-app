import { Component, inject, input, effect, booleanAttribute, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';

import { IJobsFilters, JOBS_PAGE_SIZE, JobsStore } from './data-access/jobs-store';
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
  readonly limit = input(JOBS_PAGE_SIZE, { transform: numberAttribute });

  constructor() {
    effect(() => {
      const filter: IJobsFilters = {
        query: this.query() ?? '',
        location: this.location() ?? '',
        fullTimeOnly: this.fullTimeOnly(),
      };

      this.jobsStore.setFilter(filter);
    });

    effect(() => {
      const limit = this.limit();
      if (Number.isNaN(limit))
        this.router.navigate(['/jobs'], {
          queryParams: { limit: JOBS_PAGE_SIZE },
          queryParamsHandling: 'merge',
        });
      this.jobsStore.setLimit(limit);
    });
  }

  onLoadMore() {
    const nextLimit = Math.min(this.limit() + JOBS_PAGE_SIZE, this.jobsStore.filteredJobs().length);
    this.router.navigate(['/jobs'], {
      queryParams: { limit: nextLimit },
      queryParamsHandling: 'merge',
    });
  }
}
