import { Component, input } from '@angular/core';
import { Job } from '../../../shared/models/job';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jobs-list-item',
  imports: [RouterLink],
  templateUrl: `./jobs-list-item.html`,
  styleUrl: `./jobs-list-item.scss`,
})
export class JobsListItem {
  job = input.required<Job>();
}
