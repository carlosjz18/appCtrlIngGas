import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ListadoComponent} from "./pages/listado/listado.component";
import {AgregarComponent} from "./pages/agregar/agregar.component";
import {IngresoComponent} from "./pages/ingreso/ingreso.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'listado', component: ListadoComponent},
      {path: 'agregar', component: AgregarComponent},
      {path: 'editar/:id', component: AgregarComponent},
      {path: 'detalle/:id', component: IngresoComponent},
      {path: '**', redirectTo: 'listado'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresosRoutingModule {
}
