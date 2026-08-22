import { HttpClient, httpResource } from '@angular/common/http';
import { computed, effect, inject, Service, signal } from '@angular/core';
import { Job } from '../../shared/models/job';
import { Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Service()
export class JobsStore {
  private http = inject(HttpClient);

  private state = signal<JobsState>(initialState);
  private jobsResource = httpResource<Job[]>(() => 'data/data.json', { defaultValue: [] });

  readonly loading = this.jobsResource.isLoading;
  readonly jobs = this.jobsResource.asReadonly().value;
  filter = computed(() => this.state().filter);

  filteredJobs = computed(() =>
    this.jobs().filter((j) => {
      const { query, location, fullTimeOnly } = this.filter();
      const {
        position,
        company,
        contract,
        description,
        requirements: { content, items },
      } = j;
      const jobContent = `${position}${company}${description}${content}${items.join(' ')}`;

      return (
        (!query || jobContent.toLowerCase().includes(query.toLowerCase())) &&
        (!location || j.location.toLowerCase().includes(location.toLowerCase())) &&
        (!fullTimeOnly || contract === 'Full Time')
      );
    }),
  );

  private loadJobs = new Subject<void>();

  constructor() {
    effect(() => console.log('State Changed:\t', this.state()));

    this.loadJobs
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.state.update((s) => ({ ...s, loading: true }))),
        switchMap(() =>
          this.http
            .get<Job[]>('data/data.json')
            .pipe(tap((jobs) => this.state.update((s) => ({ ...s, loading: false, jobs })))),
        ),
      )
      .subscribe();

    this.loadJobs.next();
  }

  setFilter(filter: IJobsFilters) {
    this.state.update((s) => ({ ...s, filter }));
  }
}

interface JobsState {
  filter: IJobsFilters;
}

export interface IJobsFilters {
  query: string;
  location: string;
  fullTimeOnly: boolean;
}

const initialState: JobsState = {
  filter: {
    query: '',
    location: '',
    fullTimeOnly: false,
  },
};
