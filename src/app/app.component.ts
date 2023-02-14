import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appCtrlIngGas';
  nombre: string = 'Carlos Jaimez';
  valor: number = 1000;
  obj = {
    nombre: 'Peep'
  }

  mostarDatos() {
    console.log(this.nombre);
    console.log(this.valor);
    console.log(this.obj);
  }
}
