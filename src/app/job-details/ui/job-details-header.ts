import { Component, input, computed } from '@angular/core';
import { Job } from '../../shared/models/job';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-job-details-header',
  imports: [MatButtonModule],
  template: `
    <div class="job__logo" [style.background]="job().logoBackground">
      <img [src]="job().logo" alt="{{ job().company }}'s logo image" />
    </div>
    <div class="job__content">
      <div class="job__text">
        <p class="heading heading--md">
          {{ job().company }}
        </p>
        <p class="text">{{ companyUrl() }}</p>
      </div>
      <a class="btn btn--secondary" matButton="filled" [href]="job().website" target="__blank">
        Company Site
      </a>
    </div>
  `,
  styles: `
    @use '../../../../public/scss/_media.scss' as *;

    :host {
      display: flex;
      background-color: light-dark(var(--neutral-0), var(--primary-700));
      border-radius: 6px;
      transition: background-color 0.35s ease-in-out;
      position: relative;

      .job {
        &__logo {
          --size: 14rem;
          width: var(--size);
          height: var(--size);
          border-bottom-left-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            scale: 2;
          }
        }

        &__content {
          flex: 1;
          padding: 0 4.3rem 0 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        &__text {
          display: flex;
          flex-direction: column;
          gap: 1.3rem;

          .heading {
            color: light-dark(var(--primary-700), var(--neutral-0));
            transition: color 0.35s ease-in-out;
          }

          .text {
            line-height: 1;
            color: var(--neutral-600);
          }
        }
      }

      @include respond(phone) {
        .job {
          &__logo {
            --size: 5rem;
            border-radius: 1.5rem;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, -50%);

            img {
              scale: 1;
            }
          }

          &__content {
            padding: 4.9rem 0 3.2rem;
            flex-direction: column;
            gap: 2.4rem;
          }

          &__text {
            gap: 1.2rem;
          }
        }
      }
    }
  `,
})
export class JobDetailsHeader {
  job = input.required<Job>();

  companyUrl = computed(() => `${this.job().company.replace(' ', '-').toLowerCase()}.com`);
}
