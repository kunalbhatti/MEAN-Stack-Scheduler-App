import {
  Component,
  OnInit
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/app/animation';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class TodoComponent implements OnInit {

  userName: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.checkIfLoggedIn();
    this.userName = localStorage.getItem('name');
  }

  logout() {
    this.authService.logout().subscribe(
      (result: {
        token: string,
        auth: boolean
      }) => {
        if(!result.auth) {
          document.getElementById('closeLogoutModal').click();
          localStorage.setItem('login-token', result.token);
          this.router.navigate(['/', 'auth', 'login']);
          
        }
      }
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
