import { httpResource } from '@angular/common/http';
import { computed, Service, signal } from '@angular/core';
import { Job } from '../../shared/models/job';

export const JOBS_PAGE_SIZE = 12;

@Service()
export class JobsStore {
  private state = signal<JobsState>(initialState);
  private jobsResource = httpResource<Job[]>(() => 'data/data.json', { defaultValue: [] });

  readonly loading = this.jobsResource.isLoading;
  readonly jobs = this.jobsResource.asReadonly().value;
  filter = computed(() => this.state().filter);
  limit = computed(() => this.state().limit);

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

  visibleJobs = computed(() => this.filteredJobs().slice(0, this.limit()));
  hasMore = computed(() => this.filteredJobs().length > this.limit());

  setFilter(filter: IJobsFilters) {
    this.state.update((s) => ({ ...s, filter }));
  }

  setLimit(limit: number) {
    this.state.update((s) => ({ ...s, limit }));
  }
}

interface JobsState {
  filter: IJobsFilters;
  limit: number;
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
  limit: JOBS_PAGE_SIZE,
};
