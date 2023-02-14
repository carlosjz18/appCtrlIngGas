import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {MenuComponent} from './menu/menu.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import {SharedRoutingModule} from "./shared-routing.module";


@NgModule({
  declarations: [
    MenuComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    SharedRoutingModule
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule {
}
