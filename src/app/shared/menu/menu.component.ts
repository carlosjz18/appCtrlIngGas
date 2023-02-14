import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})
export class MenuComponent implements OnInit {

  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Ingresos',
        icon: 'pi pi-check-circle',
        items: [
          {
            label: 'Nuevo',
            icon: 'pi pi-fw pi-plus',
            routerLink: 'ingresos/agregar'
          },
          {
            label: 'Lista',
            icon: 'pi pi-bars',
            routerLink: 'ingresos/listado'
          },
          {
            label: 'Gráficas',
            icon: 'pi pi-chart-bar'
          }
        ]
      },
      {
        label: 'Gastos',
        icon: 'pi pi-dollar',
        items: [{
          label: 'Nuevo',
          icon: 'pi pi-fw pi-plus',
        },
          {
            label: 'Lista',
            icon: 'pi pi-bars'
          },
          {
            label: 'Gráficas',
            icon: 'pi pi-chart-bar'
          }
        ]
      },
      {
        label: 'Cuentas',
        icon: 'pi pi-wallet',
        items: [{
          label: 'Nuevo',
          icon: 'pi pi-fw pi-plus',
        },
          {
            label: 'Lista',
            icon: 'pi pi-bars'
          }
        ]
      },
      {
        label: 'Usuarios',
        icon: 'pi pi-users',
        items: [{
          label: 'Nuevo',
          icon: 'pi pi-fw pi-plus',
        },
          {
            label: 'Lista',
            icon: 'pi pi-bars'
          }
        ]
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-power-off'
      }
    ];
  }

}
