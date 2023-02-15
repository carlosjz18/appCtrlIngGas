import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
//import {AuthResponse, Usuario} from '../interfaces/interfaces';
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
    console.log('url', url);
    const body = {email, password};

    return this.http.post<any>(url, body, {observe: 'response'})
      .pipe(
        tap(resp => {
          console.log(resp);
          if (resp.headers.get('Authorization')) {
            localStorage.setItem('token', resp.headers.get('Authorization')!);
          }
        }),
        map(resp => true),
        catchError(err => of(false))
      );
  }

  validarToken(): Observable<boolean> {
    if (localStorage.getItem('token')) {
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    this.router.navigateByUrl('/auth');
    localStorage.clear();
  }

}
