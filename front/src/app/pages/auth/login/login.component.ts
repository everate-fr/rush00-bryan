import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PathEnum } from 'src/app/enum/path.enum';
import { IAuthenticationService } from 'src/app/services/authentication/iauthentication.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
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
		private readonly _toast: HotToastService,
	) { }

	public showPassword(): void {
		this.passwordShowed = !this.passwordShowed;
	}

	public async validateForm(): Promise<void> {
		if (!this.userName || !this.password) {
			return;
		}

		this.invalidCredentials = false;
		this.disableSubmit = true;
		const loadingToast = this._toast.loading('Loading...');

		const isValid = await this._authenticationService.login(this.userName, this.password)

		loadingToast.close();
		this.disableSubmit = false;

		if (isValid) {
			this._toast.success('Connection réussie');
			this._router.navigate([PathEnum.Home]);
		} else {
			this._toast.error(`Nom d'utilisateur ou mot de passe incorrect`);
			this.invalidCredentials = true;
		}
	}
}
