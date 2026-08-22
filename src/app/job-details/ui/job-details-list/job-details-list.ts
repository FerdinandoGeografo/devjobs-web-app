import { Component, input } from '@angular/core';
import { JobMetadata } from '../../../shared/models/job';

@Component({
  selector: 'app-job-details-list',
  imports: [],
  templateUrl: `./job-details-list.html`,
  styleUrl: './job-details-list.scss',
})
export class JobDetailsList {
  title = input.required<string>();
  jobMetadata = input.required<JobMetadata>();
  bulletMode = input<'point' | 'numeric'>('point');
}
