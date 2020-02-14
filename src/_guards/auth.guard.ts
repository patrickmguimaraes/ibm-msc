import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('ibm-msc-session')) {
            // logged in so return true
            return true;
        }
        console.log("not logged");

        // not logged in so redirect to login page with the return url
        if(state.url=='/'){
            this.router.navigate(['/login']);
        }
        else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
        }
        
        return false;
    }
}