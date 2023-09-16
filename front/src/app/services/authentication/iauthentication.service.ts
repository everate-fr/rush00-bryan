
export abstract class IAuthenticationService {

    public abstract login(username: string, password: string): Promise<boolean>;
}