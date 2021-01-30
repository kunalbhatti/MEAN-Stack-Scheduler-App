import {
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import {
  AuthComponent
} from './auth/auth.component';

import {
  RegistrationComponent
} from './auth/registration/registration.component';

import {
  LoginComponent
} from './auth/login/login.component';
import {
  ForgotPasswordComponent
} from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/forgot-password/reset-password/reset-password.component';


const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegistrationComponent
    },
    {
      path: 'password-recovery',
      component: ForgotPasswordComponent
    },
    {
      path: 'password-reset/:token',
      component: ResetPasswordComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
