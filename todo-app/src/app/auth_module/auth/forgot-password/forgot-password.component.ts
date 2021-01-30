import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  message;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRecover(f: NgForm) {
    this.authService.getRecoveryLink(f.value).subscribe(
      recoveryData => {
        this.message = recoveryData.message
      }
    );
  }

}
