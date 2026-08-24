import { Component, input, computed } from '@angular/core';
import { Job } from '../../../shared/models/job';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-job-details-header',
  imports: [MatButton],
  templateUrl: `./job-details-header.html`,
  styleUrl: `./job-details-header.scss`,
  host: {
    class: 'container container--md container--fixed',
    'animate.enter': 'animate animate--bounce-in',
  },
})
export class JobDetailsHeader {
  job = input.required<Job>();
  companyUrl = computed(() => `${this.job().company.replace(' ', '-').toLowerCase()}.com`);
}
