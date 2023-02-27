import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {Usuario} from "../../usuarios/interfaces/usuarios.interface";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiEndpointUrl: string = environment.apiEndpointUrl;
  private _usuario!: Usuario;
  private isLogin: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  get usuario() {
    return {...this._usuario};
  }

  registro(name: string, email: string, password: string) {

    const url = `${this.apiEndpointUrl}/auth/new`;
    const body = {name, email, password};

    return this.http.post<any>(url, body)
      .pipe(
        tap(({ok, token}) => {
          if (ok) {
            localStorage.setItem('token', token!);
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      );

  }

  login(email: string, password: string) {

    const url = `${this.apiEndpointUrl}/login`;
    const body = {email, password};

    return this.http.post<any>(url, body, {observe: 'response'})
      .pipe(
        tap(resp => {
          if (resp.headers.get('Authorization')) {
            this._usuario = {
              nombre: resp.body.nombre,
              correo: resp.body.correo,
              rol: resp.body.rol
            }
            localStorage.setItem('user', JSON.stringify(this._usuario));
            localStorage.setItem('token', resp.headers.get('Authorization')!);
          }
        }),
        map(resp => true),
        catchError(err => of(false))
      );
  }

  validarToken(): Observable<boolean> {
    if (localStorage.getItem('token')) {
      this._usuario = JSON.parse(localStorage.getItem('user')!);
      return of(true);
    } else {
      return of(false);
    }
  }

  isLoggedIn() {
    if (localStorage.getItem('user')) {
      this.isLogin = true;
    }
    return this.isLogin;
  }

  logout() {
    this.router.navigateByUrl('/auth');
    localStorage.clear();
  }

}
