import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from './modules/authentication.module';
import { ErrorModule } from './modules/error.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AuthDirective } from './directives/auth.directive';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { UserModule } from './modules/user.module';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthDirective,
    WorkoutsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ErrorModule,
    UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
  ],
  providers: [BsDropdownConfig],
  bootstrap: [AppComponent],
})
export class AppModule {}
