import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ValidarTokenGuard} from "./guards/validar-token.guard";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [ValidarTokenGuard],
    canActivateChild: [ValidarTokenGuard]
  },
  {
    path: 'ingresos',
    loadChildren: () => import('./ingresos/ingresos.module').then(m => m.IngresosModule),
    canActivate: [ValidarTokenGuard, AuthGuard],
    canActivateChild: [ValidarTokenGuard, AuthGuard],
    data: {
      role: 'ROLE_USER'
    }
  },
  {
    path: 'gastos',
    loadChildren: () => import('./gastos/gastos.module').then(m => m.GastosModule),
    canActivate: [ValidarTokenGuard, AuthGuard],
    canActivateChild: [ValidarTokenGuard, AuthGuard],
    data: {
      role: 'ROLE_USER'
    }
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./cuentas/cuentas.module').then(m => m.CuentasModule),
    canActivate: [ValidarTokenGuard, AuthGuard],
    canActivateChild: [ValidarTokenGuard, AuthGuard],
    data: {
      role: 'ROLE_USER'
    }
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
    canActivate: [ValidarTokenGuard, AuthGuard],
    canActivateChild: [ValidarTokenGuard, AuthGuard],
    data: {
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: '404',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule)
  },
  {
    path: "",
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
