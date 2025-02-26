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
import { HttpClientModule } from '@angular/common/http';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LocalTimePipe,
    MatIconModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
