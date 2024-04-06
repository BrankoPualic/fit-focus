import { NgModule } from '@angular/core';
import * as auth from '../pages/authentication/index';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [auth.SigninComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
})
export class AuthModule {}
