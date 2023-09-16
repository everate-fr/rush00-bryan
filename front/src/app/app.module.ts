import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { IAuthenticationService } from './services/authentication/iauthentication.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { IApiService } from './services/api/iapi.service';
import { ApiService } from './services/api/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: IAuthenticationService, useClass: AuthenticationService },
    { provide: IApiService, useClass: ApiService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
