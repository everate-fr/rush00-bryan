import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PathEnum } from 'src/app/enum/path.enum';
import { IAuthenticationService } from 'src/app/services/authentication/iauthentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	public passwordShowed: boolean = false;

	public invalidCredentials: boolean = false;
	public disableSubmit: boolean = false;
	public userName: string = '';
	public password: string = '';

	constructor(
		private readonly _authenticationService: IAuthenticationService,
		private readonly _router: Router,
	) { }

	public showPassword(): void {
		this.passwordShowed = !this.passwordShowed;
	}

	public async validateForm(): Promise<void> {
		this.invalidCredentials = false;
		this.disableSubmit = true;

		const isValid = await this._authenticationService.login(this.userName, this.password)

		this.disableSubmit = false;

		if (isValid) {
			this._router.navigate([PathEnum.Home]);
		} else {
			this.invalidCredentials = true;
		}
	}
}
