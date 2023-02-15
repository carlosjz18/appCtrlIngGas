import {Usuario} from "../../usuarios/interfaces/usuarios.interface";

export interface Cuenta {
  cuentaId: number;
  institucionFinanciera: string;
  tipoCuenta: string;
  saldoInicial: number;
  saldoActual: number;
  usuario?: Usuario;
}
