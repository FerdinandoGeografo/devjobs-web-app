import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'jobs',
    loadComponent: () => import('./jobs/jobs').then((c) => c.Jobs),
    title: 'Frontend Mentor | Devjobs web app',
  },
  {
    path: 'jobs/:id',
    loadComponent: () => import('./job-details/job-details').then((c) => c.JobDetails),
    title: (route) => `Frontend Mentor | Devjob #${route.paramMap.get('id')}`,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'jobs',
  },
];
