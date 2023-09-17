
export abstract class IAuthenticationService {

    public abstract login(username: string, password: string): Promise<boolean>;
    public abstract register(username: string, password: string): Promise<boolean>;
    public abstract isLoggedIn(): Promise<boolean>;
}