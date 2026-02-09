import { Component, input } from '@angular/core';
import { Job } from '../../shared/models/job';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobs-list-item',
  imports: [RouterLink],
  template: `
    <div class="job__logo" [style.background]="job().logoBackground">
      <img [src]="job().logo" alt="{{ job().company }}'s company logo" />
    </div>
    <div>
      <div class="job__data">
        <p class="text">{{ job().postedAt }}</p>
        <div aria-hidden="true"></div>
        <p class="text">{{ job().contract }}</p>
      </div>
      <h2 [routerLink]="[job().id]" class="job__position heading heading--md">
        {{ job().position }}
      </h2>
      <p class="job__company text">{{ job().company }}</p>
    </div>
    <p class="job__location heading heading--sm">{{ job().location }}</p>
  `,
  styles: `
    :host {
      padding: 4.9rem 3.2rem 3.2rem;
      border-radius: 6px;
      background-color: light-dark(var(--neutral-0), var(--primary-700));
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 4.4rem;
      position: relative;
      transition: background-color .35s ease-in-out;

      .job {
        &__logo {
          position: absolute;
          top: 0;
          left: 3.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 5rem;
          height: 5rem;
          border-radius: 1.5rem;
          transform: translateY(-50%);
        }

        &__data {
          height: 1.9rem;
          display: flex;
          align-items: start;
          gap: 1.2rem;
          color: var(--neutral-600);

          .text {
            line-height: 1;
          }

          div {
            height: 4px;
            width: 4px;
            border-radius: 50%;
            margin-top: 8px;
            background: currentColor;
          }
        }

        &__position {
          line-height: 1;
          color: light-dark(var(--primary-700), var(--neutral-0));
          margin: 1.3rem 0 1.7rem;
          transition: color .35s ease-in-out;
        }

        &__company {
          line-height: 1;
          color: var(--neutral-600);
        }

        &__location {
          color: var(--primary-400);
        }
      }
    }
  `,
})
export class JobsListItem {
  job = input.required<Job>();
}
