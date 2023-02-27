import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../main/main.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['carlos@gmail.com', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['123', [Validators.required, Validators.minLength(3)]]
  });

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private messageService: MessageService) {
  }

  login() {
    const {email, password} = this.miFormulario.value;

    this.authService.login(email, password)
      .subscribe(resp => {
        if (resp) {
          this.router.navigateByUrl('/dashboard');
        } else {
          /*this.messageService.add({
            severity: 'error',
            summary: 'Ocurrió un error',
            detail: 'Usuario y/o contraseña incorrectos'
          });*/
        }
      });
  }

}
