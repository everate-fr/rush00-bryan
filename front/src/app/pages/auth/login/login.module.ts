import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CtaPrimaryModule } from '../../../components/cta/cta-primary/cta-primary.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    CtaPrimaryModule,
    FormsModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
