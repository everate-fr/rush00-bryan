import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './components/layouts/dashboard/dashboard.component';
import { DashboardHomeComponent } from './pages/dashboard-home/dashboard-home.component';
import { IAuthenticationService } from './services/authentication/iauthentication.service';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [() => inject(IAuthenticationService).isLoggedIn()],
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
      },
      {
        path: 'account',
        component: AccountInfoComponent
      }
    ]
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
