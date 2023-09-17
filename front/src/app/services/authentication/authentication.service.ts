import { Injectable } from "@angular/core";
import { IApiService } from "../api/iapi.service";
import { IAuthenticationService } from "./iauthentication.service";
import { User } from "src/app/models/user.model";
import { AuthenticationEnum } from "src/app/enum/authentication.enum";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService implements IAuthenticationService {

    constructor(
        private readonly _apiService: IApiService,
    ) { }


    public async login(username: string, password: string): Promise<boolean> {
        let response;
        try {
            response = await this._apiService.callApi<any>(AuthenticationEnum.LoginRoute, "POST", { username, password });
        } catch (_error) { }

        if (response) {
            localStorage.setItem(AuthenticationEnum.Token, response.token);
        }

        return response;
    }

    public async register(username: string, password: string): Promise<boolean> {
        let response;
        try {
            response = await this._apiService.callApi<any>(AuthenticationEnum.RegisterRoute, "POST", { username, password });
        }
        catch (_error) { }

        if (response) {
            localStorage.setItem(AuthenticationEnum.Token, response.token);
        }

        return response;
    }

    public async isLoggedIn(): Promise<boolean> {
        let response = null;
        try {
            response = await this._apiService.callApi<User>(AuthenticationEnum.MeRoute, "GET");
        } catch (_error) { }

        return response !== null;
    }
}