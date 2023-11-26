import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'auth', loadChildren: () => import('./pages/auth/auth.routes').then(m => m.routes) },
    { path: 'tasks', loadChildren: () => import('./pages/task-list/task-list.routes').then(m => m.routes) },
];
