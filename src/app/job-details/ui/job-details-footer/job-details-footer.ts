import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Job } from '../../../shared/types/job';

@Component({
  selector: 'app-job-details-footer',
  imports: [MatButton],
  templateUrl: `./job-details-footer.html`,
  styleUrl: `./job-details-footer.scss`,
})
export class JobDetailsFooter {
  position = input.required<Job['position']>();
  company = input.required<Job['company']>();
  apply = input.required<Job['apply']>();
}
