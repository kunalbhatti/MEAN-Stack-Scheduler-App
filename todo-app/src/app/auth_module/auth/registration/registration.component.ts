import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  Router
} from '@angular/router';

import {
  AuthService
} from './../../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  valid: boolean; // display error if the input is invalid
  message: string; // the message that will be displayed. Error or success. Sent by the server
  
  // whether password and confirm password are same in the form validation
  pswd: string;
  confirmPswd: string;

  constructor(private authService: AuthService,  private router: Router) {}

  ngOnInit(): void {
    this.valid = true;
  }

  onRegister(f: NgForm) {
    this.authService.register(f.value).subscribe(
      (registration: {
        auth: boolean,
        message: string,
        token ? : string
      }) => {
        this.valid = registration.auth;
        this.message = registration.message;

        if (this.valid) {
         localStorage.setItem('login-token', registration.token);
          this.router.navigate(['/', 'todo']);
        }
      }
    );
  }

}
