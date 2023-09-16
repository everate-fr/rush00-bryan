import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { ApiService } from './services/api/api.service';
import { IApiService } from './services/api/iapi.service';
import { IAuthenticationService } from './services/authentication/iauthentication.service';
import { AuthenticationService } from './services/authentication/authentication.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: IApiService, useClass: ApiService },
    { provide: IAuthenticationService, useClass: AuthenticationService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
