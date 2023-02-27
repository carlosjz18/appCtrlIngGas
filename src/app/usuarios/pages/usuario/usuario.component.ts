import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Usuario} from "../../interfaces/usuarios.interface";
import {UsuariosService} from "../../services/usuarios.service";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuario!: Usuario;

  constructor(private activatedRoute: ActivatedRoute,
              private usuarioService: UsuariosService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.usuarioService.getUsuarioPorId(id)),
        //tap(console.log)
      ).subscribe(usuario => this.usuario = usuario);
  }

  regresar() {
    this.router.navigate(['/usuarios/listado']);
  }

  eliminar() {
    this.usuarioService.elimninarUsuario(this.usuario.usuarioId!)
      .subscribe(resp => {
        console.log(resp);
        this.router.navigate(['/usuarios/listado']);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación éxitosa',
          detail: 'Usuario eliminado correctamente con el ID: ' + this.usuario.usuarioId
        });
      });
  }

}
