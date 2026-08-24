import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatButton, RouterLink],
  selector: 'app-empty-box',
  styleUrl: './empty-box.scss',
  templateUrl: './empty-box.html',
  host: {
    'animate.enter': 'animate animate--bounce-in-top',
  },
})
export class EmptyBox {
  emptyMessage = input.required<string>();
}
