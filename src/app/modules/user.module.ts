import { NgModule } from '@angular/core';
import * as user from '../pages/user/index';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    user.ProfileComponent,
    user.UserComponent,
    user.UserFuncComponent,
  ],
  imports: [CommonModule],
})
export class UserModule {}
