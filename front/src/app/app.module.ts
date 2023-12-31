import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { IAuthenticationService } from './services/authentication/iauthentication.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { IApiService } from './services/api/iapi.service';
import { ApiService } from './services/api/api.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginModule } from './pages/auth/login/login.module';
import { AuthenticationInterceptor } from './services/authentication/authentication-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
  ],
  providers: [
    { provide: IAuthenticationService, useClass: AuthenticationService },
    { provide: IApiService, useClass: ApiService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
