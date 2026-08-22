import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-logo',
  styleUrl: `./logo.scss`,
  templateUrl: './logo.html',
})
export class Logo {}
