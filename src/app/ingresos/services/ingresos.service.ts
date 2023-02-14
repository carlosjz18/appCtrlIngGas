import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ingreso} from "../interfaces/ingresos.interface";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  get httpHeaders() {
    //const headers = new HttpHeaders().set('x-token', localStorage.getItem('token') || '');
    return new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYXJsb3NAZ21haWwuY29tIiwiZXhwIjoxNjc4OTI0MDM3LCJub21icmUiOiJDYXJsb3MgSmFpbWV6Iiwicm9sIjoiQURNSU4ifQ.ukyenH9lHntuAhWGBX4x9r8-zAlb_2HGSTpATVjfNAo');
  }

  constructor(private http: HttpClient) {
  }

  getIngresos(): Observable<Ingreso[]> {

    return this.http.get<Ingreso[]>('http://localhost:8080/api/ingresos', {headers: this.httpHeaders})
      .pipe(
        map((resp: any) => {
            return resp.data;
          }
        )
      );
  }
}
