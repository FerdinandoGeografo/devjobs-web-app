import { Component, computed, effect, inject, model, output, signal } from '@angular/core';
import { form, FormField, submit } from '@angular/forms/signals';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Filter } from '../../types/filter';
import { BreakpointsStore } from '../../../shared/data-access/breakpoints.store';
import { JobsFiltersDialog } from '../jobs-filters-dialog/jobs-filters-dialog';

@Component({
  selector: 'app-jobs-filters',
  imports: [
    FormField,
    MatFormField,
    MatIcon,
    MatInputModule,
    MatCheckbox,
    MatIconButton,
    MatButton,
    MatDivider,
  ],
  templateUrl: `./jobs-filters.html`,
  styleUrl: `./jobs-filters.scss`,
  host: {
    class: 'container container--lg container--fixed',
    'animate.enter': 'animate animate--bounce-in',
  },
})
export class JobsFilters {
  private dialog = inject(MatDialog);
  protected readonly brStore = inject(BreakpointsStore);

  private dialogRef = signal<MatDialogRef<JobsFiltersDialog, Filter> | null>(null);
  readonly filter = model.required<Filter>();
  readonly searchClicked = output<Filter>();

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
    const ref = this.dialog.open<JobsFiltersDialog, Filter, Filter>(JobsFiltersDialog, {
      data: this.filtersForm().value(),
      width: '100%',
      maxWidth: '87.2vw',
    });
    this.dialogRef.set(ref);
    ref.afterClosed().subscribe((res) => {
      this.dialogRef.set(null);
      if (res !== undefined) this.searchClicked.emit(res);
    });
  }
}
