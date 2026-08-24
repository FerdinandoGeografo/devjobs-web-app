import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  imports: [MatProgressSpinner],
  selector: 'app-loader-box',
  styleUrl: './loader-box.scss',
  templateUrl: './loader-box.html',
})
export class LoaderBox {}
