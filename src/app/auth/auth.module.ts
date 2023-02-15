import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthRoutingModule} from "./auth-routing.module";
import {MainComponent} from './pages/main/main.component';
import {LoginComponent} from './pages/login/login.component';
import {RegistroComponent} from './pages/registro/registro.component';
import {ReactiveFormsModule} from "@angular/forms";
import {PrimeNgModule} from "../prime-ng/prime-ng.module";


@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule
  ]
})
export class AuthModule {
}
