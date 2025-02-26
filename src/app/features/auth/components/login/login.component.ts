import { Component } from '@angular/core';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faWarning

} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  //Icons
  faEmail = faEnvelope;
  faEye = faEye;
  faEyeNoView = faEyeSlash;
  faWarning = faWarning;

  
  viewPassword: boolean = false;
  myForm: FormGroup; 

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.authService.validateEmail()]],
      password: ['', [Validators.required]], 
    });
  }

  enviarFormulario() {
    if (this.myForm.valid) {
      console.log('Formulario válido', this.myForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
