import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ListadoComponent} from "./pages/listado/listado.component";
import {AgregarComponent} from "./pages/agregar/agregar.component";
import {UsuarioComponent} from "./pages/usuario/usuario.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'listado', component: ListadoComponent},
      {path: 'agregar', component: AgregarComponent},
      {path: 'editar/:id', component: AgregarComponent},
      {path: 'detalle/:id', component: UsuarioComponent},
      {path: '**', redirectTo: 'listado'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule {
}
