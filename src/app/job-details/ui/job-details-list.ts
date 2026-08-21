import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { JobMetadata } from '../../shared/models/job';

@Component({
  selector: 'app-job-details-list',
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <p class="heading heading--md">{{ title() }}</p>

    <div class="list__container">
      <p class="text">{{ jobMetadata().content }}</p>
      <ul class="list__list">
        @for (item of jobMetadata().items; track $index) {
          <li class="list__item" [style.gap.px]="bulletMode() === 'point' ? 32 : 25">
            @if (bulletMode() === 'point') {
              <div class="list__point" aria-hidden="true"></div>
            } @else {
              <span class="list__num text">{{ $index }}</span>
            }
            <p class="text">{{ item }}</p>
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      gap: 2.8rem;

      .heading--md {
        line-height: 1;
        color: var(--primary-700);
      }

      .text {
        color: var(--neutral-600);
      }

      .list {
        &__container {
          display: flex;
          flex-direction: column;
          gap: 2.4rem;
        }

        &__list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        &__item {
          display: flex;
          align-items: start;
        }

        &__point {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
          background: var(--primary-400);
          margin-top: 1rem;
        }

        &__num {
          color: var(--primary-400);
          font-weight: 700;
        }
      }
    }
  `,
})
export class JobDetailsList {
  title = input.required<string>();
  jobMetadata = input.required<JobMetadata>();
  bulletMode = input<'point' | 'numeric'>('point');
}
