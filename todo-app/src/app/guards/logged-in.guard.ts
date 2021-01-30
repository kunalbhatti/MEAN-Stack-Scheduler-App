import {
  Injectable
} from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";

import {
  Observable
} from "rxjs";
import {
  map,
  take
} from 'rxjs/operators';

import {
  AuthService
} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise < boolean | UrlTree > | Observable < boolean | UrlTree > {
    return this.authService.checkIfLoggedIn().pipe(take(1), map(
      (user: {
        name: string,
        auth: boolean
      }) => {
        if (user.auth) {
          this.router.navigate(['/', 'todo', 'monthly']);
          return false;
        }
        return true;
      }
    ))
  }

}
