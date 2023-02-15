import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ingreso} from "../interfaces/ingresos.interface";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  private apiEndpointUrl: string = environment.apiEndpointUrl;

  get httpHeaders() {
    return new HttpHeaders().set('Authorization', localStorage.getItem('token') || '');
  }

  constructor(private http: HttpClient) {
  }

  getIngresos(): Observable<Ingreso[]> {
    return this.http.get<Ingreso[]>(`${this.apiEndpointUrl}/api/ingresos`, {headers: this.httpHeaders})
      .pipe(map((resp: any) => {
        return resp.data;
      }));
  }

  getIngresoPorId(id: number): Observable<Ingreso> {
    return this.http.get<Ingreso[]>(`${this.apiEndpointUrl}/api/ingresos/${id}`, {headers: this.httpHeaders})
      .pipe(map((resp: any) => {
        return resp.data;
      }));
  }

  agregarIngreso(ingreso: Ingreso): Observable<Ingreso> {
    return this.http.post<Ingreso[]>(`${this.apiEndpointUrl}/api/ingresos`, ingreso, {headers: this.httpHeaders})
      .pipe(map((resp: any) => {
        return resp.data;
      }));
  }

  actualizarIngreso(ingreso: Ingreso): Observable<any> {
    return this.http.put<Ingreso[]>(`${this.apiEndpointUrl}/api/ingresos/${ingreso.ingresoId}`, ingreso, {headers: this.httpHeaders});
  }

  elimninarIngreso(id: number): Observable<any> {
    return this.http.delete<Ingreso[]>(`${this.apiEndpointUrl}/api/ingresos/${id}`, {headers: this.httpHeaders});
  }
}
