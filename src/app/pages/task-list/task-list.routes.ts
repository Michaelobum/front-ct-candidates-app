import { Route } from "@angular/router";

export const routes: Route[] = [
    { path: '', loadComponent: () => import('./task-list.component').then(m => m.TaskListComponent) },
];