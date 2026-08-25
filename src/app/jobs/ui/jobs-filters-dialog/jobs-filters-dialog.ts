import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';

import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Filter } from '../../types/filter';

@Component({
  imports: [
    FormsModule,
    FormField,
    MatDialogModule,
    MatFormField,
    MatInputModule,
    MatButton,
    MatCheckbox,
    MatIcon,
    MatDivider,
  ],
  selector: 'app-jobs-filters-dialog',
  templateUrl: `./jobs-filters-dialog.html`,
  styleUrl: `./jobs-filters-dialog.scss`,
})
export class JobsFiltersDialog {
  protected readonly filters = inject<Filter>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<JobsFiltersDialog>);

  protected readonly filtersModel = signal(this.filters);
  protected readonly filtersForm = form(this.filtersModel);

  protected onSubmit(event: Event) {
    event.preventDefault();
    this.dialogRef.close(this.filtersForm().value());
  }
}
