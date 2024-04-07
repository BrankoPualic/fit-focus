import { NgModule } from '@angular/core';
import * as user from '../pages/user/index';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { BodyweightComponent } from '../pages/bodyweight/bodyweight.component';
import { WorkoutsComponent } from '../pages/workouts/workouts.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'profile',
        component: user.UserComponent,
        pathMatch: 'full',
      },
      { path: 'bodyweight', component: BodyweightComponent, pathMatch: 'full' },
      { path: 'workouts', component: WorkoutsComponent, pathMatch: 'full' },
    ],
  },
];
@NgModule({
  declarations: [
    user.ProfileComponent,
    user.UserComponent,
    user.UserFuncComponent,
    BodyweightComponent,
    WorkoutsComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [],
})
export class UserModule {}
