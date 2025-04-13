import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './features/dashboard/components/home/home.component';
import { SubjectsComponent } from './features/dashboard/components/subjects/subjects.component';
import { UsersComponent } from './features/dashboard/components/users/users.component';
import { CategoriesComponent } from './features/dashboard/components/categories/categories.component';
import { ManageTeachersComponent } from './features/dashboard/components/manage-teachers/manage-teachers.component';
import { HelpInformationComponent } from './features/dashboard/components/help-information/help-information.component';
import { SettingsComponent } from './features/dashboard/components/settings/settings.component';
import { LocalTimePipe } from './shared/pipes/shared.pipe';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsModalComponent } from './shared/components/notifications-modal/notifications-modal.component';
import { TableComponent } from './shared/components/table/table.component';
import { FadeOutComponent } from './shared/components/fade-out/fade-out.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfileCardComponent } from './shared/components/profile-card/profile-card.component';
import { ModalFormComponent } from './shared/components/modal-form/modal-form.component';
import { ModalConfirmComponent } from './shared/components/modal-confirm/modal-confirm.component';
import { UserFormComponent } from './features/dashboard/components/users/components/user-form/user-form.component';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { SliderHorizontalComponent } from './shared/components/slider-horizontal/slider-horizontal.component';
import { LayoutGridComponent } from './shared/components/layout-grid/layout-grid.component';
import { UserDetailsComponent } from './features/dashboard/components/users/components/user-details/user-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { KanbanComponent } from './shared/components/kanban/kanban.component';
import { ErrorPathComponent } from './shared/components/error-path/error-path.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    SubjectsComponent,
    UsersComponent,
    CategoriesComponent,
    ManageTeachersComponent,
    HelpInformationComponent,
    SettingsComponent,
    NotificationsModalComponent,
    TableComponent,
    FadeOutComponent,
    ProfileCardComponent,
    ModalFormComponent,
    ModalConfirmComponent,
    UserFormComponent,
    SliderHorizontalComponent,
    LayoutGridComponent,
    UserDetailsComponent,
    KanbanComponent,
    ErrorPathComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LocalTimePipe,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    DragDropModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
