import { NgModule, RendererFactory2 } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { AuthDirective } from '../directives/auth.directive';
import { LineChartComponent } from '../components/line-chart/line-chart.component';
import { BodyweightModalComponent } from '../components/bodyweight-modal/bodyweight-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthDirective, LineChartComponent, BodyweightModalComponent],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule,
    ReactiveFormsModule,
  ],
  providers: [BsDropdownConfig, TabsetConfig, BsModalService],
  exports: [
    BsDropdownModule,
    TabsModule,
    AuthDirective,
    LineChartComponent,
    BsDatepickerModule,
    BodyweightModalComponent,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
