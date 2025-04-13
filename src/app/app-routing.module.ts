import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { HomeComponent } from './features/dashboard/components/home/home.component';
import { SubjectsComponent } from './features/dashboard/components/subjects/subjects.component';
import { UsersComponent } from './features/dashboard/components/users/users.component';
import { CategoriesComponent } from './features/dashboard/components/categories/categories.component';
import { ManageTeachersComponent } from './features/dashboard/components/manage-teachers/manage-teachers.component';
import { HelpInformationComponent } from './features/dashboard/components/help-information/help-information.component';
import { SettingsComponent } from './features/dashboard/components/settings/settings.component';
import { authGuard } from './shared/guards/auth.guard';
import { UserDetailsComponent } from './features/dashboard/components/users/components/user-details/user-details.component';
import { ErrorPathComponent } from './shared/components/error-path/error-path.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'user/:id',
        component: UserDetailsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'teachers',
        component: ManageTeachersComponent,
      },
      {
        path: 'help',
        component: HelpInformationComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'pageNotFound',
    component: ErrorPathComponent,
  },

  {
    path: '**',
    redirectTo: 'pageNotFound',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
