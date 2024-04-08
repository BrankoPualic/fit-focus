import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as auth from './pages/authentication/index';
import { signinGuard } from './guards/signin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
  {
    path: 'authentication',
    component: auth.SigninComponent,
    canActivate: [signinGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
