import { Component, inject, input, effect, numberAttribute } from '@angular/core';
import { Router } from '@angular/router';
import { JobDetailsStore } from './data-access/job-details-store';
import { JobDetailsContent } from './ui/job-details-content/job-details-content';
import { JobDetailsFooter } from './ui/job-details-footer/job-details-footer';
import { JobDetailsHeader } from './ui/job-details-header/job-details-header';
import { EmptyBox } from '../shared/ui/empty-box';

@Component({
  selector: 'app-job-details',
  imports: [JobDetailsHeader, JobDetailsContent, JobDetailsFooter, EmptyBox],
  templateUrl: './job-details.html',
  styleUrl: `./job-details.scss`,
})
export class JobDetails {
  protected id = input(null, { transform: numberAttribute });

  private readonly router = inject(Router);
  protected readonly detailsStore = inject(JobDetailsStore);

  constructor() {
    effect(() => {
      const id = Number(this.id());

      if (Number.isNaN(id)) this.router.navigate(['/jobs'], { replaceUrl: true });

      this.detailsStore.setJobId(id);
    });
  }
}
