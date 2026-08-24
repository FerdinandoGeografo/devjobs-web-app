import { Component, input } from '@angular/core';
import { JobSection } from '../../../shared/models/job';

@Component({
  selector: 'app-job-details-list',
  templateUrl: `./job-details-list.html`,
  styleUrl: './job-details-list.scss',
})
export class JobDetailsList {
  title = input.required<string>();
  jobSection = input.required<JobSection>();
  bulletMode = input<'point' | 'numeric'>('point');
}
