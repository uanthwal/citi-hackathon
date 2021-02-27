import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (JSON.parse(sessionStorage.getItem('wasPassEntered')) || state.url === "/analytics?load_type=prev_trends") {
            return true;
        }
        this.router.navigate(['/home']);
        return false;
    }
}