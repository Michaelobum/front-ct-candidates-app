import { Route } from "@angular/router";

export const routes: Route[] = [
    { path: '', loadComponent: () => import('./auth.component').then(m => m.AuthComponent) },
];