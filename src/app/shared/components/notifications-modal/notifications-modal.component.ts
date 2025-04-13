import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications-modal',
  standalone: false,
  templateUrl: './notifications-modal.component.html',
  styleUrl: './notifications-modal.component.scss',
})
export class NotificationsModalComponent {
  @Input() notifications: { id: string; title: string; message: string; type: 'success' | 'error' | 'info' }[] =[];
  @Output() close = new EventEmitter<void>();

  isActive: boolean = false;

  constructor(private notificationsService: NotificationsService){
    this.notifications = this.notificationsService.notifications$();
  }

  ngOnInit() {
    this.isActive = true;
  }

  closeModal(): void {
    this.isActive = false;
    setTimeout(() => {
      this.close.emit();
    }, 1000);
  }
}
