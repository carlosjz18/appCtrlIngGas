import {Cuenta} from "../../cuentas/interfaces/cuentas.interface";

export interface Ingreso {
  ingresoId?: number;
  descripcion: string;
  monto: number;
  fecha: Date;
  categoria: string;
  cuenta: Cuenta;
}



