import { Component, input, model, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IJobsFilters } from '../data-access/jobs-store';

@Component({
  selector: 'app-jobs-filters',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
  ],
  template: `
    <mat-form-field class="filters__query" subscriptSizing="dynamic" appearance="fill">
      <input
        type="text"
        matInput
        placeholder="Filter by title, companies, expertise..."
        #query
        [value]="filter().query"
        (input)="
          filter.set({
            query: query.value,
            location: location.value,
            fullTimeOnly: filter().fullTimeOnly
          })
        "
      />
      <mat-icon matIconPrefix svgIcon="custom:search" />
    </mat-form-field>

    <mat-divider vertical />

    <mat-form-field class="filters__location" subscriptSizing="dynamic" appearance="fill">
      <input
        type="text"
        matInput
        placeholder="Filter by location..."
        [value]="filter().location"
        #location
        (input)="
          filter.set({
            query: query.value,
            location: location.value,
            fullTimeOnly: filter().fullTimeOnly
          })
        "
      />
      <mat-icon matIconPrefix svgIcon="custom:location" />
    </mat-form-field>

    <mat-divider vertical />

    <div class="filters__end">
      <mat-checkbox
        [checked]="filter().fullTimeOnly"
        (change)="
          filter.set({
            query: query.value,
            location: location.value,
            fullTimeOnly: !filter().fullTimeOnly
          })
        "
      >
        Full Time Only
      </mat-checkbox>
      <button matButton="filled" (click)="searchClicked.emit(filter())">Search</button>
    </div>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      border-radius: 6px;
      background-color: light-dark(var(--neutral-0), var(--primary-700));
      display: flex;
      align-items: center;
      height: 8rem;
      overflow: hidden;
      transition: background-color .35s ease-in-out;

      .filters {
        &__query {
          flex: 1;

          &::ng-deep .mat-mdc-form-field-icon-prefix .mat-icon {
            padding: 0 1.6rem 0 3.2rem;
          }
        }

        &__location {
          flex: 1;
          max-width: 30rem;

          &::ng-deep .mat-mdc-form-field-icon-prefix .mat-icon {
            width: 1.7rem;
            height: 2.4rem;
            padding: 0 1.6rem 0 2.3rem;
          }
        }

        &__end {
          padding: 0 1.6rem 0 3.2rem;
          flex: 1;
          max-width: 34.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.6rem;

          @include mat.button-overrides((
            filled-horizontal-padding: 3.55rem,
          ));
        }
      }
    }
  `,
})
export class JobsFilters {
  filter = model.required<IJobsFilters>();
  searchClicked = output<IJobsFilters>();
}
