import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../../../shared/services/users.service';
import { NotificationsService } from '../../../../../../shared/services/notifications.service';
import { environment } from '../../../../../../../environments/environment.prod';
import { catchError, tap, throwError } from 'rxjs';
import { HttpService } from '../../../../../../shared/services/http.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Input() title: string = 'Formulario';
  @Input() url: string = '';
  @Input() fields: {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: { label: string; value: any }[];
    disabled?: boolean;
  }[] = [];
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmitSuccess = new EventEmitter<any>();
  @Input() user: any | null = null;

  form!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    // Aquí agregamos al form que recibe el componente, cada 'controller' que le mandamos por la prop de 'fields'
    this.form = this.fb.group(
      this.fields.reduce((acc: any, field) => {
        acc[field.name] = field.required ? [null, Validators.required] : [null];
        return acc;
      }, {})
    );

    // let body = {
    //   user_id: 49,
    //   full_name: 'Mauricio Molina',
    //   user: 'mauriciod-molinap@unilibre.edu.co',
    //   level_training: 'Front-end Developer',
    //   role_id: 'docente',
    //   working_day_id: 'Jornada Completa',
    // };

    // this.http
    //   .put(`/users/${body.user_id}`, body)
    //   .pipe(
    //     // tap((response) => {
    //     // }),
    //     catchError((error) => {
    //       console.error('Error en la solicitud:', error);
    //       this.isSubmitting = false;
    //       return throwError(() => error);
    //     })
    //   )
    //   .subscribe((responseReq) => {
    //     console.log("Actualizado: ", responseReq);          
    //   });

    // if (this.user) {
    //   const formValues: any = {};
    //   this.fields.forEach((field) => {
    //     if (this.user.hasOwnProperty(field.name)) {
    //       formValues[field.name] = this.user[field.name];
    //     }
    //   });

    //   this.form.patchValue(formValues);
    // }

    // Aquí validamos de que si se trata de un admin se
    if (this.form.get('role')) {
      this.form.get('role')?.valueChanges.subscribe((role) => {
        this.handleRoleChange(role);
      });
    }
  }

  submitForm(): void {
    this.isSubmitting = true;
    if (this.form.invalid) return;
    let body: any = {};
    this.fields.forEach((field) => {
      body[field.name] = this.form.get(field.name)?.value || null;
    });

    this.http
      .post(`/${this.url}`, body)
      .pipe(
        tap((response) => {
          this.onSubmitSuccess.emit(response);
          this.executeActionAfterRequest(body);
        }),
        catchError((error) => {
          console.error('Error en la solicitud:', error);
          this.isSubmitting = false;
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.closeModal();
      });
  }

  handleRoleChange(role: number): void {
    const disableFields = ['level_training', 'working_day'];
    disableFields.forEach((field) => {
      if (this.form.get(field)) {
        console.log(field);
        if (role == 1) {
          this.form.get(field)?.disable();
        } else {
          this.form.get(field)?.setValidators(Validators.required);
        }
      }
    });
  }

  executeActionAfterRequest(newValue?: any) {
    switch (this.title) {
      case 'Registrar Usuario':
        this.userService.getAllUsers();
        // this.notificationsService.addNotification(
        //   'Éxito!',
        //   `Acabas de crear el usuario: ${newValue?.full_name}`,
        //   'success'
        // );
        break;
    }
  }

  closeModal(): void {
    this.onClose.emit();
  }
}
