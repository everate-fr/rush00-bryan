import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSidebarComponent } from './dashboard-sidebar.component';



@NgModule({
  declarations: [
    DashboardSidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardSidebarComponent
  ]
})
export class DashboardSidebarModule { }
