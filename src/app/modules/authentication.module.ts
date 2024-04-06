import { NgModule } from '@angular/core';
import * as auth from '../pages/authentication/index';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [auth.SigninComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [],
})
export class AuthModule {}
