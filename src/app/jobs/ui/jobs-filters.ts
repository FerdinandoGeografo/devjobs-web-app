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
    <mat-form-field [style.flex]="1" subscriptSizing="dynamic" appearance="fill">
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
            fullTimeOnly: !filter().fullTimeOnly
          })
        "
      />
      <mat-icon matIconPrefix svgIcon="custom:search" />
    </mat-form-field>

    <mat-divider vertical />

    <mat-form-field [style.flex]="1" subscriptSizing="dynamic" appearance="fill">
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

    <div class="filters__end" [style.flex]="1">
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
    :host {
      border-radius: 6px;
      background: var(--neutral-0);
      display: flex;
      align-items: center;
      height: 8rem;

      .filters {
        &__end {
          display: flex;
          align-items: center;
          gap: 2.6rem;
        }
      }
    }
  `,
})
export class JobsFilters {
  filter = model.required<IJobsFilters>();
  searchClicked = output<IJobsFilters>();
}
