import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { appConfig } from '../app/app.config';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_model/';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

    login(email: String, password: String, remember: Boolean=true) {
        return this.http.post<any>(appConfig.apiUrl + '/user/authenticate', { email: email, password: password })
            .map(siteSession => {
                
                //Login successful and if there's a jwt token in the response
                if (siteSession && siteSession.token) {
                    this.changeSession(siteSession.user, siteSession, remember);
                }
            });
    }

    getSession(): any{
        return JSON.parse(localStorage.getItem('ibm-msc-session'));
    }

    changeSession(user: User, siteSession:any = null, remember: Boolean=true) {
        var siteSession = siteSession==null ? JSON.parse(localStorage.getItem('ibm-msc-session')) : siteSession;
        
        siteSession.name = user.name;
        siteSession.id = user._id;
        siteSession.remember = remember;

        localStorage.setItem('ibm-msc-session', JSON.stringify(siteSession));
    }

    logout(goToLogin:Boolean = true) {
        // remove user from local storage to log user out
        localStorage.removeItem('ibm-msc-session');
        
        if(goToLogin) {
            this.router.navigate(['/login']);
        }
    }
}