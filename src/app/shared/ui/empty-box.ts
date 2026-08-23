import { Component, input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatAnchor, RouterLink],
  selector: 'app-empty-box',
  styleUrl: './empty-box.scss',
  templateUrl: './empty-box.html',
})
export class EmptyBox {
  emptyMessage = input.required<string>();
}
