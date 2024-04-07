import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as auth from './pages/authentication/index';
import * as errors from './pages/errors/index';
import * as user from './pages/user/index';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { signinGuard } from './guards/signin.guard';
import { authGuard } from './guards/auth.guard';
import { BodyweightComponent } from './pages/bodyweight/bodyweight.component';

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
