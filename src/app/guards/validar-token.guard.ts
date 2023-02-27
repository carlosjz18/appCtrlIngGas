import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> | boolean {
    //console.log('canActivate : ValidarTokenGuard');
    return this.authService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/auth');
          }
        })
      );
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    //console.log('canActivateChild : ValidarTokenGuard');
    return this.canActivate();
  }


}
