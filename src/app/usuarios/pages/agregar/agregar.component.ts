import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../interfaces/usuarios.interface";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {switchMap} from "rxjs";
import {UsuariosService} from "../../services/usuarios.service";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: []
})
export class AgregarComponent implements OnInit {

  title: string = 'Nuevo Usuario';

  usuario: Usuario = {
    nombre: '',
    correo: '',
    contrasena: '',
    rol: ''
  };

  roles: string[];

  usuarioForm: FormGroup = this.fb.group({
    nombre: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(45)]],
    correo: [null, [Validators.required, Validators.email]],
    contrasena: [null, [Validators.required, Validators.minLength(8)]],
    rol: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuariosService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
    this.roles = ['USER', 'ADMIN'];
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    // Cuando la url no sea editar se hace return
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.title = 'Editar Usuario';

    // Cuando la ruta es editar se trae la información del usuario por medio del service
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.usuarioService.getUsuarioPorId(id))
      )
      .subscribe(usuario => {
        this.usuario = usuario;
        this.usuario.contrasena = '';
        this.usuarioForm.patchValue(usuario);
      });
  }

  campoEsValido(campo: string) {
    return this.usuarioForm.controls[campo].errors && this.usuarioForm.controls[campo].touched;
  }

  guardar() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      return;
    }

    const {nombre, correo, contrasena, rol} = this.usuarioForm.value;
    this.usuario.nombre = nombre;
    this.usuario.correo = correo;
    this.usuario.contrasena = contrasena;
    this.usuario.rol = rol;

    console.log(this.usuario);

    if (this.usuario.usuarioId) {
      console.log('--- Actualiza ---');
      this.usuarioService.actualizarUsuario(this.usuario)
        .subscribe(resp => {
          console.log('Respuesta');
          console.log(resp);
          this.router.navigate(['/usuarios/listado']);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación éxitosa',
            detail: 'Usuario actualizado correctamente con el ID: ' + this.usuario.usuarioId
          });
          this.usuarioForm.reset();
        });
    } else {
      console.log('--- Agrega ---');
      this.usuarioService.agregarUsuario(this.usuario)
        .subscribe(usuario => {
          this.router.navigate(['/usuarios/listado']);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación éxitosa',
            detail: 'Usuario agregado correctamente con el ID: ' + usuario.usuarioId
          });
          this.usuarioForm.reset();
        });
    }
  }

}
