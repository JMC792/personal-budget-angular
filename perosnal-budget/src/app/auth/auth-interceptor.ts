import { HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http"
import {Injectable } from "@angular/core"
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private AuthService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler ) {
        const authtoken = this.AuthService.getToken();
        const authRequest = req.clone({
            headers: req.headers.set('Authoriation', "Bearer " + authtoken)
        });
        return next.handle(req);
    }
}