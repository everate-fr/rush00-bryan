import { Component } from '@angular/core';
import { IAuthenticationService } from 'src/app/services/authentication/iauthentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	public passwordShowed: boolean = false;

	public invalidCredentials: boolean = false;
	public userName: string = '';
	public password: string = '';

	constructor(
		private readonly _authenticationService: IAuthenticationService,
	) { }

	public showPassword() {
		this.passwordShowed = !this.passwordShowed;
	}

	public async validateForm() {
		const response = await this._authenticationService.login(this.userName, this.password)
		console.log(response);
		
		return true;
	}
}
