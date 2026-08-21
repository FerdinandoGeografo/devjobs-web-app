import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Job } from '../../shared/models/job';
import { JobsListItem } from './jobs-list-item';

@Component({
  selector: 'app-jobs-list',
  imports: [JobsListItem],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <ul class="jobs">
      @for (job of jobs(); track job.id) {
        <li>
          <app-jobs-list-item [job]="job" />
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      .jobs {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        place-content: center;
        column-gap: 3rem;
        row-gap: 6.5rem;
      }
    }
  `,
})
export class JobsList {
  jobs = input.required<Job[]>();
}
