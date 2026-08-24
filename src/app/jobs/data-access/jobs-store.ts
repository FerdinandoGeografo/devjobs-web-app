import { httpResource } from '@angular/common/http';
import { computed, Service, signal } from '@angular/core';
import { Job, JOBS_PAGE_SIZE } from '../../shared/types/job';
import { Filter, INITIAL_FILTER } from '../types/filter';

@Service()
export class JobsStore {
  private jobsResource = httpResource<Job[]>(() => 'data/data.json', { defaultValue: [] });
  readonly #filter = signal<Filter>(INITIAL_FILTER);
  readonly #limit = signal(JOBS_PAGE_SIZE);

  readonly loading = this.jobsResource.isLoading;
  readonly jobs = this.jobsResource.asReadonly().value;
  readonly filter = this.#filter.asReadonly();
  readonly limit = this.#limit.asReadonly();

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

  setFilter(filter: Filter) {
    this.#filter.set(filter);
  }

  setLimit(limit: number) {
    this.#limit.set(limit);
  }
}
