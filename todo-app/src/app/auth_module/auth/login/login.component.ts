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
} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // display invalid credentials if invalid
  valid: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.valid = true;
  }

  onLogin(f: NgForm) {
    this.authService.login(f.value).subscribe(
      (loginRespose: {
        auth: boolean,
        token: string
      }) => {
        this.valid = loginRespose.auth;
        if (this.valid) {
          localStorage.setItem('login-token', loginRespose.token)
          this.router.navigate(['/', 'todo', 'monthly']);
        }
      }
    );
  }

}
