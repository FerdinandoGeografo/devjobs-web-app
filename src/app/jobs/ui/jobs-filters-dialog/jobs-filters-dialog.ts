import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IJobsFilters } from '../../data-access/jobs-store';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDivider } from '@angular/material/divider';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIcon,
    FormsModule,
    MatDivider,
    FormField,
  ],
  selector: 'app-jobs-filters-dialog',
  templateUrl: `./jobs-filters-dialog.html`,
  styleUrl: `./jobs-filters-dialog.scss`,
})
export class JobsFiltersDialog {
  protected readonly filtersForm = inject<FieldTree<IJobsFilters>>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<JobsFiltersDialog>);

  protected onSubmit(event: Event) {
    event.preventDefault();
    this.dialogRef.close(this.filtersForm().value());
  }
}
