import { NgModule, RendererFactory2 } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { AuthDirective } from '../directives/auth.directive';
import { LineChartComponent } from '../components/line-chart/line-chart.component';
import { BodyweightModalComponent } from '../components/bodyweight-modal/bodyweight-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import {
  BsDatepickerConfig,
  BsDatepickerModule,
} from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { PaginationConfig, PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [AuthDirective, LineChartComponent, BodyweightModalComponent],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    ReactiveFormsModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  providers: [
    BsDropdownConfig,
    TabsetConfig,
    BsModalService,
    DatePipe,
    BsDatepickerConfig,
    PaginationConfig,
  ],
  exports: [
    AuthDirective,
    LineChartComponent,
    BodyweightModalComponent,
    TabsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    BsDatepickerModule,
    PaginationModule,
  ],
})
export class SharedModule {}
