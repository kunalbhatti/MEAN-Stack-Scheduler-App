import {
  Route
} from '@angular/compiler/src/core';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  NgForm
} from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  AuthService
} from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  valid: boolean;
  message: string;
  pswd: string;
  confirmPswd: string;

  // this is the token provided to the user in the email when he wants to reset his password. Valid for 2 hours
  token: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.valid = false;
    this.route.params.subscribe(
      (params: Params) => {
        this.token = params.token;
      }
    )
  }

  onReset(f: NgForm) {
    this.authService.resetPassword(f.value, this.token).subscribe(
      (result: {
        valid: boolean,
        message: string
      }) => {
        if (result.valid) {
         this.valid = true;
         this.message = result.message;
        }
      }
    );
  }

}
