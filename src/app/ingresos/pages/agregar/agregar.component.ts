import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categoria, Ingreso} from "../../interfaces/ingresos.interface";
import {Cuenta} from "../../../cuentas/interfaces/cuentas.interface";
import {IngresosService} from "../../services/ingresos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {switchMap} from "rxjs";

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: []
})
export class AgregarComponent implements OnInit {

  title: string = 'Nuevo Ingreso';

  ingreso: Ingreso = {
    descripcion: '',
    monto: 0,
    fecha: new Date(),
    categoria: '',
    cuenta: undefined
  };

  categorias: Categoria[];

  ingresoForm: FormGroup = this.fb.group({
    descripcion: [null, [Validators.required, Validators.minLength(3)]],
    monto: [null, [Validators.required, Validators.min(0)]],
    fecha: [null, [Validators.required]],
    categoria: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder,
              private ingresoService: IngresosService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private primengConfig: PrimeNGConfig) {
    this.categorias = [
      {descripcion: 'Otros', code: 'Otros'},
      {descripcion: 'Sueldo', code: 'Sueldo'},
      {descripcion: 'Inversiones', code: 'Inversiones'},
      {descripcion: 'Nómina', code: 'Nómina'},
      {descripcion: 'Premio', code: 'Premio'},
      {descripcion: 'Regalo', code: 'Regalo'}
    ];
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    // Cuando la url no sea editar se hace return
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.title = 'Editar Ingreso';

    // Cuando la ruta es editar se trae la información del ingreso por medio del service
    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.ingresoService.getIngresoPorId(id))
      )
      .subscribe(ingreso => {
        this.ingreso = ingreso;
        this.ingresoForm.patchValue(ingreso);
        this.ingresoForm.controls['fecha'].setValue(new Date(ingreso.fecha));
      });
  }

  campoEsValido(campo: string) {
    return this.ingresoForm.controls[campo].errors && this.ingresoForm.controls[campo].touched;
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      this.ingresoForm.markAllAsTouched();
      return;
    }

    let cuenta: Cuenta = {
      cuentaId: 1,
      institucionFinanciera: '',
      tipoCuenta: '',
      saldoInicial: 0,
      saldoActual: 0,
      usuario: undefined
    };

    const {descripcion, monto, fecha, categoria} = this.ingresoForm.value;
    this.ingreso.descripcion = descripcion;
    this.ingreso.monto = monto;
    this.ingreso.fecha = fecha;
    this.ingreso.categoria = categoria;
    this.ingreso.cuenta = cuenta;

    console.log(this.ingreso);

    if (this.ingreso.ingresoId) {
      console.log('--- Actualiza ---');
      this.ingresoService.actualizarIngreso(this.ingreso)
        .subscribe(resp => {
          console.log('Respuesta');
          console.log(resp);
          this.router.navigate(['/ingresos/listado']);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación éxitosa',
            detail: 'Ingreso actualizado correctamente con el ID: ' + this.ingreso.ingresoId
          });
          this.ingresoForm.reset();
        });
    } else {
      console.log('--- Agrega ---');
      this.ingresoService.agregarIngreso(this.ingreso)
        .subscribe(ingreso => {
          this.router.navigate(['/ingresos/listado']);
          this.messageService.add({
            severity: 'success',
            summary: 'Operación éxitosa',
            detail: 'Ingreso agregado correctamente con el ID: ' + ingreso.ingresoId
          });
          this.ingresoForm.reset();
        });
    }
  }

}
