import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z]+[A-Z][a-zA-Z]+-[a-zA-Z]+[A-Z][a-zA-Z]+@unilibre\.edu\.co$/;
      return emailRegex.test(control.value) ? null : { validateEmail: true };
    };
  }
}
