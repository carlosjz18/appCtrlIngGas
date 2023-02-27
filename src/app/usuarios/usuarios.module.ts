import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsuariosRoutingModule} from './usuarios-routing.module';
import {AgregarComponent} from './pages/agregar/agregar.component';
import {HomeComponent} from './pages/home/home.component';
import {UsuarioComponent} from './pages/usuario/usuario.component';
import {ListadoComponent} from './pages/listado/listado.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    AgregarComponent,
    HomeComponent,
    UsuarioComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class UsuariosModule { }
