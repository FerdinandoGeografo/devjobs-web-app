import { Component, computed, effect, inject, model, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { IJobsFilters } from '../../data-access/jobs-store';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BreakpointsStore } from '../../../shared/data-access/breakpoints.store';
import { form, FormField, submit } from '@angular/forms/signals';
import { JobsFiltersDialog } from '../jobs-filters-dialog/jobs-filters-dialog';

@Component({
  selector: 'app-jobs-filters',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    FormField,
  ],
  templateUrl: `./jobs-filters.html`,
  styleUrl: `./jobs-filters.scss`,
})
export class JobsFilters {
  private dialog = inject(MatDialog);

  private dialogRef = signal<MatDialogRef<JobsFiltersDialog, IJobsFilters> | null>(null);
  protected readonly brStore = inject(BreakpointsStore);
  readonly filter = model.required<IJobsFilters>();

  readonly searchClicked = output<IJobsFilters>();

  protected readonly filtersForm = form(this.filter);

  protected readonly queryPlaceholder = computed(() => {
    if (this.brStore.isPhone() || this.brStore.isTablet()) return 'Filter by title...';
    return 'Filter by title, companies, expertise...';
  });
  protected readonly fullTimeLabel = computed(() => {
    if (this.brStore.isTablet()) return 'Full Time';
    return 'Full Time Only';
  });

  constructor() {
    effect(() => {
      const ref = this.dialogRef();
      if (ref && !this.brStore.isPhone()) ref.close();
    });
  }

  protected onSubmit(event: Event) {
    event.preventDefault();
    submit(this.filtersForm, async () => {
      const filter = this.filter();
      this.searchClicked.emit(filter);
    });
  }

  protected openMoreFilters() {
    const ref = this.dialog.open(JobsFiltersDialog, {
      data: this.filtersForm,
      width: '100%',
      maxWidth: '87vw',
    });
    this.dialogRef.set(ref);
    ref.afterClosed().subscribe((res: IJobsFilters | null) => {
      this.dialogRef.set(null);
      if (res !== null) this.searchClicked.emit(res);
    });
  }
}
