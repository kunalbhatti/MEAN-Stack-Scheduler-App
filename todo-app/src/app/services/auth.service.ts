import {
  Injectable
} from "@angular/core";
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  url = "http://localhost:8080/";
  //url = '';

  constructor(private http: HttpClient) {}

  register(registrationData: {
    name: string,
    email: string,
    password: string
  }): Observable < any > {
    return this.http.post(`${this.url}auth/register`, registrationData, {
      headers: this.headers
    });
  }

  login(loginData: {
    email: string,
    password: string
  }): Observable < any > {
    return this.http.post(`${this.url}auth/login`, loginData, {
      headers: this.headers
    });
  }

  logout() {
    return this.http.get(`${this.url}auth/logout`);
  }

  // returns an observable which will be consumed by the auth-guard
  checkIfLoggedIn(): Observable < any > {
    let token = localStorage.getItem('login-token');
    if(!token) {
      token = '';
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    })
    // sending an empty body is required
    return this.http.post(`${this.url}auth/validate-login`, {}, {
      headers
    });

  }

  getRecoveryLink(recoveryData: {
    email: string
  }): Observable < any > {
    return this.http.post(`${this.url}auth/recovery-link`, recoveryData, {
      headers: this.headers
    });
  }

  resetPassword(resetData: {
    password: string
  }, token: string): any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': token
    });

    return this.http.put(`${this.url}auth/reset-password`, resetData, {
      headers
    })
  }
}
