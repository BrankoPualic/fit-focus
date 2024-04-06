import { NgModule } from '@angular/core';
import * as errors from '../pages/errors/index';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [errors.NotFoundComponent, errors.AuthorizationErrorComponent],
  imports: [BrowserModule],
  providers: [],
})
export class ErrorModule {}
