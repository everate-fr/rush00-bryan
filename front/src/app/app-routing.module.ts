import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IAuthenticationService } from './services/authentication/iauthentication.service';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent,
    canActivate: [() => inject(IAuthenticationService).isLoggedIn()],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
