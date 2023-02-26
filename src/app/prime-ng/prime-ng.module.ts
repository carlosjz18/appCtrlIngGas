import {NgModule} from '@angular/core';

/* PrimeNG */
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenubarModule} from 'primeng/menubar';
import {InputTextModule} from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {RippleModule} from "primeng/ripple";
import {DividerModule} from 'primeng/divider';
import {CalendarModule} from 'primeng/calendar';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    MenubarModule,
    InputTextModule,
    TableModule,
    RippleModule,
    DividerModule,
    CalendarModule,
    InputNumberModule,
    DropdownModule
  ]
})
export class PrimeNgModule {
}
