import { Component, input, computed } from '@angular/core';
import { Job } from '../../../shared/models/job';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-details-header',
  imports: [MatButtonModule],
  templateUrl: `./job-details-header.html`,
  styleUrl: `./job-details-header.scss`,
})
export class JobDetailsHeader {
  job = input.required<Job>();

  companyUrl = computed(() => `${this.job().company.replace(' ', '-').toLowerCase()}.com`);
}
