import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from './modules/authentication.module';
import { ErrorModule } from './modules/error.module';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './modules/user.module';
import { SharedModule } from './modules/shared.module';
import './extensions/observable-extension';
import './common/constants';
import { CreateWorkoutComponent } from './pages/workouts/create-workout/create-workout.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CreateWorkoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ErrorModule,
    UserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
