import { IApiService } from "../api/iapi.service";
import { IAuthenticationService } from "./iauthentication.service";

export class AuthenticationService implements IAuthenticationService {

    constructor(
        private readonly _apiService: IApiService,
    ) { }
    
    
    public async login(username: string, password: string): Promise<boolean> {
        const test = await this._apiService.callApi<boolean>("/api/login", "POST", { username, password });

        return true;
    }
}