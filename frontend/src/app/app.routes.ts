import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'autenticacao',
    loadChildren: () => import('./screens/authentication/authentication.module').then((m) => m.AuthenticationModule),
    title: 'Autenticação'
  },
  {
    path: 'home',
    loadChildren: () => import('./screens/home/home.module').then((m) => m.HomeModule),
    title: 'Dashboard'
  },
  {
    path: 'board/:id',
    loadChildren: () => import('./screens/board/board.module').then((m) => m.BoardModule),
    title: 'Board Columns'
  }

];
