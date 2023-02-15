import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Ingreso} from "../../interfaces/ingresos.interface";
import {switchMap, tap} from "rxjs";
import {IngresosService} from "../../services/ingresos.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styles: []
})
export class IngresoComponent implements OnInit {

  ingreso!: Ingreso;

  constructor(private activatedRoute: ActivatedRoute,
              private ingresoService: IngresosService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.ingresoService.getIngresoPorId(id)),
        //tap(console.log)
      ).subscribe(ingreso => this.ingreso = ingreso);
  }

  regresar() {
    this.router.navigate(['/ingresos/listado']);
  }

  eliminar() {
    this.ingresoService.elimninarIngreso(this.ingreso.ingresoId!)
      .subscribe(resp => {
        /*console.log('Respuesta');
        console.log(resp);*/
        this.router.navigate(['/ingresos/listado']);
        this.messageService.add({
          severity: 'success',
          summary: 'Operación éxitosa',
          detail: 'Ingreso eliminado correctamente con el ID: ' + this.ingreso.ingresoId
        });
      });
  }

}
