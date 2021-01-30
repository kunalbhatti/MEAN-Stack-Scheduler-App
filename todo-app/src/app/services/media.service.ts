import {
  Injectable
} from '@angular/core';
import {
  MediaObserver,
  MediaChange
} from '@angular/flex-layout';
import {
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MediaService {

  private media$: Observable < MediaChange[] > ;

  constructor(private mediaObserver: MediaObserver) {
    this.media$ = mediaObserver.asObservable();               
  }

  getScreenSize(): Observable < MediaChange[] > {
    return this.media$;
  }

}
