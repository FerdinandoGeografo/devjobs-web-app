import { Component, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Job } from '../../../shared/types/job';
import { JobsListItem } from '../jobs-list-item/jobs-list-item';
import { LoaderBox } from '../../../shared/ui/loader-box/loader-box';
import { EmptyBox } from '../../../shared/ui/empty-box/empty-box';

@Component({
  selector: 'app-jobs-list',
  imports: [MatButton, JobsListItem, LoaderBox, EmptyBox],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.scss',
})
export class JobsList {
  loading = input(false);
  jobs = input.required<Job[]>();
  hasMore = input(false);
  loadMoreClicked = output<void>();
}
