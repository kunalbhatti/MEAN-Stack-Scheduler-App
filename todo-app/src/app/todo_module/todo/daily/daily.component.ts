import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { MediaService } from './../../../services/media.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css']
})
export class DailyComponent implements OnInit {

  constructor(private mediaService: MediaService) {}

  screenSize: string;

  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  selectedDate: {
    day: number,
    month: number,
    year: number,
    fetchList: boolean
  };

  ngOnInit(): void {

    this.mediaService.getScreenSize().subscribe(
      mq => {
        this.screenSize = mq[0].mqAlias;
      }
    )

    let today = new Date();

    this.selectedDate = {

      day: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
      fetchList: true

    }

  }

  getList() {

    const currentMonthLastDate = new Date(this.selectedDate.year, this.selectedDate.month + 1, 0).getDate();
    let lastMonthLastDate = new Date(this.selectedDate.year, this.selectedDate.month, 0).getDate(); // previous months last date

    if (this.selectedDate.day > currentMonthLastDate) {
      this.selectedDate.day = 1;
      this.selectedDate.month = this.selectedDate.month + 1;
      if (this.selectedDate.month > 11) {
        this.selectedDate.year = this.selectedDate.year + 1;
        this.selectedDate.month = 0;
      }
    }

    if (this.selectedDate.day < 1) {
      this.selectedDate.day = lastMonthLastDate;
      this.selectedDate.month = this.selectedDate.month - 1;
      if (this.selectedDate.month < 0) {
        this.selectedDate.year = this.selectedDate.year - 1
        this.selectedDate.month = 11;
      }
    }

    // In case of objects the value is object reference. Without this the change detection cycle will not pick up the change in object value
    this.selectedDate = Object.assign({}, this.selectedDate);

  }

}
