import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public notifications: WritableSignal<{ id: string; title: string; message: string; type: "success" | "error" | "info" }[]> = signal([]);

  constructor() {}

  public get notifications$() {
    return this.notifications;
  }

  addNotification(title: string, message: string, type: "success" | "error" | "info" = "info") {
    const newNotification = { id: Date.now().toString(), title, message, type };
    this.notifications.update((notifications) => [...notifications, newNotification]);
    setTimeout(() => this.removeNotification(newNotification.id), 5000);
  }

  removeNotification(id: string) {
    this.notifications.update((notifications) => notifications.filter(n => n.id !== id));
  }

  clearNotifications() {
    this.notifications.set([]);
  }
}
