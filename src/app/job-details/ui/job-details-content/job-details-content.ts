import { Component, input } from '@angular/core';
import { Job } from '../../../shared/models/job';
import { MatAnchor } from '@angular/material/button';
import { JobDetailsList } from '../job-details-list/job-details-list';

@Component({
  selector: 'app-job-details-content',
  imports: [MatAnchor, JobDetailsList],
  templateUrl: `./job-details-content.html`,
  styleUrl: `./job-details-content.scss`,
})
export class JobDetailsContent {
  job = input.required<Job>();
}
