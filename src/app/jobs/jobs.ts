import { Component, inject, input, effect, booleanAttribute, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';

import { JobsStore } from './data-access/jobs-store';
import { JobsList } from './ui/jobs-list/jobs-list';
import { JobsFilters } from './ui/jobs-filters/jobs-filters';
import { Filter } from './types/filter';
import { JOBS_PAGE_SIZE } from '../shared/types/job';

function transformLimit(value: string | number | undefined): number {
  const limit = numberAttribute(value);
  return Number.isInteger(limit) && limit > 0 ? limit : JOBS_PAGE_SIZE;
}

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
  readonly limit = input(JOBS_PAGE_SIZE, { transform: transformLimit });

  constructor() {
    effect(() => {
      this.jobsStore.setFilter({
        query: this.query() ?? '',
        location: this.location() ?? '',
        fullTimeOnly: this.fullTimeOnly(),
      });
    });

    effect(() => {
      this.jobsStore.setLimit(this.limit());
    });
  }

  protected onSearch(filter: Filter) {
    this.router.navigate(['/jobs'], {
      queryParams: {
        ...filter,
        limit: this.jobsStore.limit(),
      },
      queryParamsHandling: 'merge',
    });
  }

  protected onLoadMore() {
    const nextLimit = Math.min(this.limit() + JOBS_PAGE_SIZE, this.jobsStore.filteredJobs().length);
    this.router.navigate(['/jobs'], {
      queryParams: { limit: nextLimit },
      queryParamsHandling: 'merge',
    });
  }
}
