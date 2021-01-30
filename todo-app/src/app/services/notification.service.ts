import {
  Injectable
} from "@angular/core";
import {
  ToastrService
} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  showToast(message: string, title: string) {
    if (title === 'success') {
      this.toastrService.success(message);
      return;
    }

    this.toastrService.error(message, title);


  }
}


// <div [ngClass]="{'col-11': screenSize === 'xs' || screenSize === 'sm', 'col-2 toast-display': screenSize !== 'xs' && screenSize !== 'sm'}">
// <div class="alert alert-dark action-alert" role="alert" *ngIf="action === 'create' && showToast === true">
//   Item <span class="text-success">Created </span> Successully!
// </div>
// <div class="alert alert-dark action-alert" role="alert" *ngIf="action === 'delete' && showToast === true">
//   Item <span class="text-danger">Deleted</span> Successully!
// </div>
// <div class="alert alert-dark action-alert" role="alert" *ngIf="action === 'update' && showToast === true">
//   Item <span class="text-info">Updated</span> Successully!
// </div>
// <div class="alert alert-danger action-alert" role="alert" *ngIf="error !== ''">
//   <span class="text-dark">{{error}}</span>
// </div>
// </div>
