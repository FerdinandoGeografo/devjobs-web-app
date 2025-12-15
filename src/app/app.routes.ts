import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'jobs',
    loadComponent: () => import('./jobs/jobs').then((c) => c.Jobs),
  },
  {
    path: 'jobs/:id',
    loadComponent: () => import('./job-details/job-details').then((c) => c.JobDetails),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'jobs',
  },
];
