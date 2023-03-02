import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Usuario} from "../interfaces/usuarios.interface";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiEndpointUrl: string = environment.apiEndpointUrl;

  constructor(private http: HttpClient) {
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiEndpointUrl}/api/usuarios`)
      .pipe(map((resp: any) => {
        return resp.data;
      }));
  }

  getUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario[]>(`${this.apiEndpointUrl}/api/usuarios/${id}`)
      .pipe(map((resp: any) => {
        return resp.data;
      }));
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario[]>(`${this.apiEndpointUrl}/api/usuarios`, usuario)
      .pipe(map((resp: any) => {
        return resp.data;
      }));
  }

  actualizarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<Usuario[]>(`${this.apiEndpointUrl}/api/usuarios/${usuario.usuarioId}`, usuario);
  }

  elimninarUsuario(id: number): Observable<any> {
    return this.http.delete<Usuario[]>(`${this.apiEndpointUrl}/api/usuarios/${id}`);
  }
}
