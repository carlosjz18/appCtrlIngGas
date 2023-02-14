import {Component, OnInit} from '@angular/core';
import {IngresosService} from "../../services/ingresos.service";
import {Ingreso} from "../../interfaces/ingresos.interface";

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: []
})
export class ListadoComponent implements OnInit {

  ingresos: Ingreso[] = [];

  constructor(private ingresosService: IngresosService) {
  }

  ngOnInit(): void {
    this.ingresosService.getIngresos()
      .subscribe(resp => this.ingresos = resp);
  }

}
