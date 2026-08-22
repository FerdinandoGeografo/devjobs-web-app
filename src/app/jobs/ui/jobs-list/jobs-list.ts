import { Component, input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { Job } from '../../../shared/models/job';
import { JobsListItem } from '../jobs-list-item/jobs-list-item';

@Component({
  selector: 'app-jobs-list',
  imports: [JobsListItem, MatAnchor],
  templateUrl: './jobs-list.html',
  styleUrl: './jobs-list.scss',
})
export class JobsList {
  jobs = input.required<Job[]>();
}
