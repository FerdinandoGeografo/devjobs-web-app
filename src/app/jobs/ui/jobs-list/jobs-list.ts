import { Component, input, output } from '@angular/core';
import { Job } from '../../../shared/models/job';
import { JobsListItem } from '../jobs-list-item/jobs-list-item';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-jobs-list',
  imports: [JobsListItem, MatButton],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.scss',
})
export class JobsList {
  jobs = input.required<Job[]>();
  hasMore = input(false);
  loadMoreClicked = output<void>();
}
