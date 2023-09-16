import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/layouts/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { LoginModule } from './pages/auth/login/login.module';
import { DashboardSidebarComponent } from './components/dashboard-sidebar/dashboard-sidebar.component';
import { DashboardSidebarModule } from './components/dashboard-sidebar/dashboard-sidebar.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    AccountInfoComponent,
    DashboardHomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    DashboardSidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
