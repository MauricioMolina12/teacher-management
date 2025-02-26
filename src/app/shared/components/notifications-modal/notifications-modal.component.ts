import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notifications-modal',
  standalone: false,
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.scss',
})
export class NotificationsModalComponent {
  @Input() notifications: { title: string; message: string; time: string }[] =
    [];
  @Output() close = new EventEmitter<void>();

  isActive: boolean = false;

  ngOnInit() {
    this.notifications = [
      {
        title: 'ASIGNACIÓN',
        message: 'Diego Suarez te ha asignado un plan de trabajo',
        time: '10'
      },
      {
        title: 'ASIGNACIÓN',
        message: 'Diego Suarez te ha asignado un plan de trabajo',
        time: '10'
      },
      {
        title: 'ASIGNACIÓN',
        message: 'Diego Suarez te ha asignado un plan de trabajo',
        time: '10'
      }
    ]
    this.isActive = true;
  }

  closeModal(): void {
    this.isActive = false;
    setTimeout(() => {
      this.close.emit();
    }, 1000);
  }
}
