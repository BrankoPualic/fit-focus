import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as auth from './pages/authentication/index';
import * as errors from './pages/errors/index';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { signinGuard } from './guards/signin.guard';
import { authGuard } from './guards/auth.guard';

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
    path: 'workouts',
    component: WorkoutsComponent,
    canActivate: [authGuard],
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
