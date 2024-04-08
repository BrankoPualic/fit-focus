import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { AuthDirective } from '../directives/auth.directive';
import { LineChartComponent } from '../components/line-chart/line-chart.component';

@NgModule({
  declarations: [AuthDirective, LineChartComponent],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
    BsDropdownModule,

    TabsModule,
  ],
  providers: [BsDropdownConfig, TabsetConfig],
  exports: [BsDropdownModule, TabsModule, AuthDirective, LineChartComponent],
})
export class SharedModule {}
