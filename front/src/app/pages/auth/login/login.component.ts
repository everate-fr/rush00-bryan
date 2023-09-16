import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public passwordShowed: boolean = false;

  public showPassword() {
    this.passwordShowed = !this.passwordShowed;
  }
}
