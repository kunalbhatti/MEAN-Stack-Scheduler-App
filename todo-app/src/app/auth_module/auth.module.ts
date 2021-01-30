import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  FormsModule
} from '@angular/forms';

import {
  AuthRoutingModule
} from './auth-routing.module';

import {
  SharedModule
} from '../shared_module/shared.module';

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


@NgModule({
  declarations: [LoginComponent, RegistrationComponent, ForgotPasswordComponent, AuthComponent, ResetPasswordComponent],
  imports: [CommonModule, FormsModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
