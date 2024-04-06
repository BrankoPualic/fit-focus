import { NgModule } from '@angular/core';
import * as user from '../pages/user/index';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { BodyweightComponent } from '../pages/bodyweight/bodyweight.component';
import { WorkoutsComponent } from '../pages/workouts/workouts.component';

@NgModule({
  declarations: [
    user.ProfileComponent,
    user.UserComponent,
    user.UserFuncComponent,
    BodyweightComponent,
    WorkoutsComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [],
})
export class UserModule {}
