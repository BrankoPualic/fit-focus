import { NgModule } from '@angular/core';
import * as errors from '../pages/errors/index';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '**',
        component: errors.NotFoundComponent,
      },
    ],
  },
];
@NgModule({
  declarations: [errors.NotFoundComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
})
export class ErrorModule {}
