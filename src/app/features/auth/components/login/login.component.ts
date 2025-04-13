import { Component, OnInit } from '@angular/core';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  //Icons
  faEmail = faEnvelope;
  faEye = faEye;
  faEyeNoView = faEyeSlash;
  faWarning = faWarning;

  viewPassword: boolean = false;
  myForm: FormGroup;
  errorMessage: string = '';
  sending: boolean = false;
  isSessionActive: boolean = false;
  public user: any = null;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          // this.authService.validateEmail(),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.isActiveSession$.subscribe((response) => {
      this.isSessionActive = response;
    });

    this.authService.userLogged$.subscribe((user) => {
      this.user = user;
    });
  }

  login() {
    // Controllers
    const email = this.myForm.get('email')?.value;
    const password = this.myForm.get('password')?.value;

    if (email.trim() === '' || password.trim() === '') {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return;
    }

    this.sending = true;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.authService.setUser(response?.user);
        this.sending = false;
        this.isSessionActive = false;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err?.message;
        this.sending = false;
      },
    });
  }

  createTokens(user: any) {
    this.authService.createTokens(user?.user_id).subscribe((response) => {
      if (response?.refresh_token) {
        this.authService.setTokens(response);
        this.router.navigate(['/dashboard']);
      } else {
        throw new Error('Error in create token');
      }
    });
  }

  // sendForm() {
  //   if (this.myForm.valid) {
  //     console.log('Formulario válido', this.myForm.value);
  //   } else {
  //     console.log('Formulario inválido');
  //   }
  // }
}
