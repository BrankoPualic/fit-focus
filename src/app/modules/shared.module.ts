import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AuthDirective } from '../directives/auth.directive';
import { LineChartComponent } from '../components/line-chart/line-chart.component';
import { BodyweightModalComponent } from '../components/bodyweight-modal/bodyweight-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
} from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { WorkoutModalComponent } from '../components/workout-modal/workout-modal.component';
import { AddExerciseModalComponent } from '../components/add-exercise-modal/add-exercise-modal.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
@NgModule({
  declarations: [
    AuthDirective,
    LineChartComponent,
    BodyweightModalComponent,
    WorkoutModalComponent,
    AddExerciseModalComponent,
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot(),
  ],
  providers: [BsModalService, DatePipe],
  exports: [
    AuthDirective,
    LineChartComponent,
    BodyweightModalComponent,
    TabsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    BsDatepickerModule,
    PaginationModule,
    TooltipModule,
    TypeaheadModule,
    WorkoutModalComponent,
    AddExerciseModalComponent,
  ],
})
export class SharedModule {
  constructor(private bsConfig: BsDatepickerConfig) {
    this.bsConfig.isAnimated = true;
    this.bsConfig.containerClass = 'theme-dark-blue';
  }
}
