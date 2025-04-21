import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BoardResolver } from './resolvers/board.resolver';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/landing/landing.module').then((m) => m.LandingModule),
    title: 'Landing',
  },
  {
    path: 'autenticacao',
    loadChildren: () =>
      import('./screens/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
    title: 'Autenticação',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./screens/home/home.module').then((m) => m.HomeModule),
    title: 'Dashboard',
    canActivate: [AuthGuard],
  },
  {
    path: 'boardColumns/:id',
    loadChildren: () =>
      import('./screens/board/board.module').then((m) => m.BoardModule),
    title: 'Board Columns',
    canActivate: [AuthGuard],
    resolve: {
      board: BoardResolver,
    },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
