import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationEnum } from "src/app/enum/authentication.enum";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
        });

        const token = localStorage.getItem(AuthenticationEnum.Token);
        if (token !== null) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(req);
    }
}