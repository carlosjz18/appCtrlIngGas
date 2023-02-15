import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgregarComponent} from './pages/agregar/agregar.component';
import {IngresoComponent} from './pages/ingreso/ingreso.component';
import {HomeComponent} from './pages/home/home.component';
import {ListadoComponent} from './pages/listado/listado.component';
import {IngresosRoutingModule} from "./ingresos-routing.module";
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AgregarComponent,
    IngresoComponent,
    HomeComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    IngresosRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class IngresosModule {
}
