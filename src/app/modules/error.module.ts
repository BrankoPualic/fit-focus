import { NgModule } from '@angular/core';
import * as errors from '../pages/errors/index';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [errors.NotFoundComponent, errors.AuthorizationErrorComponent],
  imports: [CommonModule],
  providers: [],
})
export class ErrorModule {}
