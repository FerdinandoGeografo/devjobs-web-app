import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Job } from '../../shared/models/job';
import { Subject, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class JobsStore {
  private http = inject(HttpClient);

  private state = signal<JobsState>(initialState);

  loading = computed(() => this.state().loading);
  jobs = computed(() => this.state().jobs);
  filter = computed(() => this.state().filter);

  filteredJobs = computed(() =>
    this.jobs().filter((j) => {
      const { query, location, fullTimeOnly } = this.filter();
      const jobContent = j.position
        .concat(j.company)
        .concat(j.description)
        .concat(j.requirements.content)
        .concat(j.requirements.items.join(' '));
      return (
        (!query || jobContent.toLowerCase().includes(query.toLowerCase())) &&
        (!location || j.location.toLowerCase().includes(location.toLowerCase())) &&
        (!fullTimeOnly || j.contract === 'Full Time')
      );
    })
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
            .pipe(tap((jobs) => this.state.update((s) => ({ ...s, loading: false, jobs }))))
        )
      )
      .subscribe();

    this.loadJobs.next();
  }

  setFilter(filter: IJobsFilters) {
    this.state.update((s) => ({ ...s, filter }));
  }
}

interface JobsState {
  loading: boolean;
  jobs: Job[];
  filter: IJobsFilters;
}

export interface IJobsFilters {
  query: string;
  location: string;
  fullTimeOnly: boolean;
}

const initialState: JobsState = {
  loading: false,
  jobs: [],
  filter: {
    query: '',
    location: '',
    fullTimeOnly: false,
  },
};
