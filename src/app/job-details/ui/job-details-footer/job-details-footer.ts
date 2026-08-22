import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Job } from '../../../shared/models/job';

@Component({
  selector: 'app-job-details-footer',
  imports: [MatButtonModule],
  templateUrl: `./job-details-footer.html`,
  styleUrl: `./job-details-footer.scss`,
})
export class JobDetailsFooter {
  position = input.required<Job['position']>();
  company = input.required<Job['company']>();
}
