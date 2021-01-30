import {
  Injectable
} from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import {
  Observable,
  throwError
} from 'rxjs';

import {
  catchError
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //url = "http://localhost:3000/";
  url = '';
  constructor(private httpClient: HttpClient) {}

  getPost(body: {
    day?: number,
    month: number,
    year: number,
    daily: boolean // data will be filtered by date
  }): Observable < any > {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('login-token')
    });

    return this.httpClient.post(`${this.url}app/get-post`, body, {
      headers
    }).pipe(catchError(this.errorHandler));
  }

  addPost(body: {
    task: string,
    date: {
      day: number,
      month: number,
      year: number
    },
    time: {
      hour: number,
      minute: number
    }
  }): Observable < any > {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('login-token')
    });

    return this.httpClient.post(`${this.url}app/add-post`, body, {
      headers
    }).pipe(catchError(this.errorHandler));
  }

  updatePost(id: string, body: {
    task: string,
    date: {
      day: number,
      month: number,
      year: number
    },
    time: {
      hour: number,
      minute: number
    }
  }) {
    const headers = new HttpHeaders({
      'x-access-token': localStorage.getItem('login-token')
    });

    return this.httpClient.patch(`${this.url}app/update-post/${id}`, body, {
      headers
    }).pipe(catchError(this.errorHandler));

  }

  deletePost(id: string) {
    const headers = new HttpHeaders({
      'x-access-token': localStorage.getItem('login-token')
    });
    return this.httpClient.delete(`${this.url}app/delete-post/${id}`, {
      headers
    }).pipe(catchError(this.errorHandler));;
  }

  errorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured. Please try again later';
    
    switch(errorRes.status) {
      case 500:
        errorMessage = 'Error on the server. Please try again later.';
        break;
      case 401:
        errorMessage = 'Unauthorized. Please log in.';
        break;
      case 400:
        errorMessage = "Operation Failed. Please try again later";
        break;
      case 404:
        errorMessage = "The requested item was not found";
        break;

    }

    return throwError(errorMessage);
  }

}
