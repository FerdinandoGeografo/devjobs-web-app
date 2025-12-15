import { Component, inject } from '@angular/core';
import { JobsFilters } from './ui/jobs-filters';
import { JobsList } from './ui/jobs-list';
import { JobsStore } from './data-access/jobs-store';

@Component({
  selector: 'app-jobs',
  imports: [JobsFilters, JobsList],
  template: `
    <section class="jobs">
      <app-jobs-filters
        [filter]="jobsStore.filter()"
        (searchClicked)="jobsStore.setFilter($event)"
      />

      <app-jobs-list [jobs]="jobsStore.filteredJobs()" />
    </section>
  `,
  styles: `
    :host {
      .jobs {
        display: flex;
        flex-direction: column;
        gap: 8rem;
        padding: 4rem 16.5rem;
      }
    }
  `,
})
export class Jobs {
  protected jobsStore = inject(JobsStore);
}
