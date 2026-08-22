import { computed, inject, Service, signal } from '@angular/core';
import { JobsStore } from '../../jobs/data-access/jobs-store';

@Service()
export class JobDetailsStore {
  private readonly jobsStore = inject(JobsStore);

  private readonly state = signal<JobDetailsState>(initialState);

  private readonly jobId = computed(() => this.state().jobId);

  readonly loading = computed(() => this.jobsStore.loading());
  readonly job = computed(
    () => this.jobsStore.jobs().find((job) => job.id === this.jobId()) ?? null,
  );
  readonly notFound = computed(() => !this.jobsStore.loading() && this.job() === null);

  setJobId(jobId: number) {
    this.state.update((s) => ({ ...s, jobId }));
  }
}

interface JobDetailsState {
  jobId: number | null;
}

const initialState: JobDetailsState = {
  jobId: null,
};
