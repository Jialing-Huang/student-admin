//This file co-operates with check-auth.js to run auth check.
//The file imported into module file to be activated

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { AuthService } from './admin.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth:AuthService){};
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const authToken = this.auth.getToken();
        const authRequest = req.clone({
            headers: req.headers.set("Authorization","Bearer " + authToken)
        });
        return next.handle(authRequest);
    }
    
}