import { Component, inject, input, effect, booleanAttribute } from '@angular/core';
import { JobsFilters } from './ui/jobs-filters';
import { JobsList } from './ui/jobs-list';
import { IJobsFilters, JobsStore } from './data-access/jobs-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobs',
  imports: [JobsFilters, JobsList],
  template: `
    <section class="jobs container container--lg">
      <app-jobs-filters
        [filter]="jobsStore.filter()"
        (searchClicked)="
          this.router.navigate(['/jobs'], {
            queryParams: {
              query: $event.query,
              location: $event.location,
              fullTimeOnly: $event.fullTimeOnly,
            },
          })
        "
      />

      <app-jobs-list [jobs]="jobsStore.filteredJobs()" />
    </section>
  `,
  styles: `
    @use '../../../public/scss/_media.scss' as *;

    :host {
      .jobs {
        display: flex;
        flex-direction: column;
        gap: 10.5rem;
        padding-bottom: 6.4rem;

        @include respond(tablet) {
          gap: 7rem;
          padding-bottom: 2rem;
        }

        @include respond(phone) {
          gap: 5.7rem;
        }
      }
    }
  `,
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
