import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    //console.log('canActivate : AuthGuard');
    return this.checkUserLogin(route);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    //console.log('canActivateChild : AuthGuard');
    return this.canActivate(next, state);
  }

  checkUserLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = 'ROLE_' + this.authService.usuario.rol;
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/auth']);
    return false;
  }
}
