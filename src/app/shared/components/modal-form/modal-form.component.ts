import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { UsersService } from '../../services/users.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-modal-form',
  standalone: false,
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss'],
})
export class ModalFormComponent implements OnInit {
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
  @Input() userData: any | null = null;

  form!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UsersService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      this.fields.reduce((acc: any, field) => {
        acc[field.name] = field.required ? [null, Validators.required] : [null];
        return acc;
      }, {})
    );

    if (this.userData) {
      const formValues: any = {};
      this.fields.forEach((field) => {
        if (this.userData.hasOwnProperty(field.name)) {
          formValues[field.name] = this.userData[field.name];
        }
      });

      this.form.patchValue(formValues);
    }

    if (this.form.get('role_id')) {
      this.form.get('role_id')?.valueChanges.subscribe((role) => {
        this.handleRoleChange(role);
      });
    }
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['userData'] && this.userData) {
  //     // this.form.patchValue(this.userData);
  //   }
  // }

  submitForm(): void {
    this.isSubmitting = true;
    if (this.form.invalid) return;

    let body: any = {};

    this.fields.forEach((field) => {
      body[field.name] = this.form.get(field.name)?.value || null;
    });

    this.http
      .post(environment.apiUrl + `/${this.url}`, body)
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
    const disableFields = ['level_training', 'working_day_id'];
    disableFields.forEach((field) => {
      if (this.form.get(field)) {
        role == 1
          ? this.form.get(field)?.disable()
          : this.form.get(field)?.enable();
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
