import { Component, input } from '@angular/core';
import { Job } from '../../shared/models/job';
import { JobsListItem } from './jobs-list-item';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-jobs-list',
  imports: [JobsListItem, MatAnchor],
  template: `
    <ul class="jobs">
      @for (job of jobs(); track job.id) {
        <li>
          <app-jobs-list-item [job]="job" />
        </li>
      }
    </ul>

    <button class="btn btn--primary" matButton="filled">Load More</button>
  `,
  styles: `
    @use '../../../../public/scss/_media.scss' as *;

    :host {
      display: flex;
      flex-direction: column;
      gap: 5.6rem;

      .jobs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
        column-gap: 3rem;
        row-gap: 6.5rem;
      }

      .btn {
        align-self: center;
      }

      @include respond(tablet) {
        .jobs {
          column-gap: 1.1rem;
        }
      }

      @include respond(phone) {
        gap: 3.2rem;

        .jobs {
          row-gap: 4.9rem;
        }
      }
    }
  `,
})
export class JobsList {
  jobs = input.required<Job[]>();
}
