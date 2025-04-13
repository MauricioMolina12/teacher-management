import { Component, Signal } from '@angular/core';
import { UsersService } from '../../../../shared/services/users.service';
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  users!: Signal<any[]>;
  showModal = false;
  showModalConfirm = false;
  userId: number | null = null;
  titleModalForm: string = '';
  selectedUser: any = null;
  user: any = null;
  isDetail: boolean = false;

  constructor(
    public usersService: UsersService,
    public authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  get Users() {
    return this.usersService.users$();
  }

  getAllUsers(): void {
    this.usersService.getTeachers();
  }

  fields: any[] = [];

  defaultFields = [
    { name: 'full_name', label: 'Nombre', type: 'text', required: true },
    { name: 'user', label: 'Usuario', type: 'email', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', required: true },
    {
      name: 'level_training',
      label: 'Nivel de formación',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Rol',
      type: 'dropdown',
      required: true,
      options: [
        { label: 'Administrador', value: 1 },
        { label: 'Docente', value: 2 },
      ],
    },
    {
      name: 'working_day_id',
      label: 'Working day',
      type: 'dropdown',
      required: true,
      options: [
        { label: 'Jornada Completa', value: 1 },
        { label: 'Media Jornada', value: 2 },
        { label: 'Catedrático', value: 3 },
      ],
    },
  ];

  openModal(
    action: 'create' | 'delete' | 'edit',
    userId?: number,
    e?: Event
  ): void {
    this.userId = null;
    this.selectedUser = null;
    e?.stopPropagation();

    switch (action) {
      case 'create':
        this.titleModalForm = 'Registrar Usuario';
        this.fields = this.defaultFields.map((field) => ({
          ...field,
          value: '',
        }));
        this.showModal = true;
        break;

      case 'delete':
        this.userId = userId!;
        this.showModalConfirm = true;
        break;

      case 'edit':
        this.titleModalForm = 'Editar Usuario ';
        this.userId = userId!;
        this.selectedUser =
          this.users().find((user) => user.usuario_id === userId) || null;
        if (this.selectedUser) {
          const values = Object.values(this.selectedUser);
          this.fields = this.defaultFields.map((field, index) => ({
            ...field,
            value: values[index],
          }));
        }
        this.showModal = true;
        break;
    }
  }

  closeModal(action: 'close-create' | 'close-delete') {
    if (action === 'close-create') {
      this.showModal = false;
      this.selectedUser = null;
    } else if (action === 'close-delete') {
      this.showModalConfirm = false;
      this.userId = null;
    }
  }

  handleSuccess(response: any) {
    console.log('POST exitoso:', response);
    this.closeModal('close-create');
  }

  handleConfirmation(confirm: boolean) {
    if (confirm && this.userId !== null) {
      this.deleteUser(this.userId);
    } else {
      this.closeModal('close-delete');
    }
  }

  deleteUser(userId: number) {
    console.log(userId);
    if (!userId) return;
    this.usersService.deleteUser(userId).subscribe({
      next: () => {
        this.closeModal('close-delete');
        this.getAllUsers();
      },
      error: (error) => {
        console.error('Error eliminando usuario:', error);
      },
    });
  }

  toDetailsUser(user_id: number) {
    if (!user_id) return;
    this.isDetail = true;
    this.router.navigate(['/users', user_id]);
  }
}
