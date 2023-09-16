import { Injectable } from "@angular/core";
import { IApiService } from "../api/iapi.service";
import { IAuthenticationService } from "./iauthentication.service";

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
            response = await this._apiService.callApi<boolean>("users/login", "POST", { username, password });
        } catch (_error) {            
            response = false;
        }

        return response;
    }

    public async register(username: string, password: string): Promise<boolean> {
        const response = await this._apiService.callApi<boolean>("users/register", "POST", { username, password });

        return true;
    }
}