import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as auth from './pages/authentication/index';
import * as errors from './pages/errors/index';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full',
  },
  { path: 'authentication', component: auth.SigninComponent }, // treba dodati canActivate: [AuthGuard]
  {
    path: 'not-authorized',
    component: errors.AuthorizationErrorComponent,
    pathMatch: 'full',
  },
  { path: '**', component: errors.NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
