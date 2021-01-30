import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Output() selectedDate = new EventEmitter < {
    day: number,
    month: number,
    year: number,
    fetchList: boolean
  } > ();

  selectedDateButton: number; // selected date on the calendar
  today: Date;

  year: number; // selected year
  monthCount: number; // count of the slected month
  selectedMonth: string; // name of the selected month

  month: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  dates: number[][] = [];
  @Input() markedDates: number[] = [];

  firstDay: number; // indicated 1-31
  firstDayIndex: number; // indicated 0-6 with 0 as Sunday
  lastDayIndex: number; // indicated 0-6 with 0 as Sunday

  // Disable the calendar navigation when the page is getting scrolled on small screen
  @Input() pageScrolled: boolean;

  constructor() {}

  ngOnInit(): void {
    this.today = new Date();
    this.year = this.today.getFullYear(); // setting to current year
    this.monthCount = this.today.getMonth(); // setting to current month
    this.getDates(this.year, this.monthCount, this.today.getDate()); // fill the dates array with the dates of current month
    this.pageScrolled = false; // Enable calendar scrolling by default
  }


  getDates(year: number, month: number, date ? : number) {

    if (month < 0) {
      month = 11;
      this.year -= 1;
      year = this.year;
    }

    if (month > 11) {
      month = 0;
      this.year += 1;
      year = this.year;
    }
    
    this.markedDates = [];

    this.monthCount = month;
    this.selectedMonth = this.month[this.monthCount];
    this.dates = [];


    // only fetch the list if the user has been on for 300 mili sec. This will prevent unwanted calls to the 
    // server if the user clicks very rapidly. Also there can be a lag between user click and displaying marked dates
    // if the user clicks very rapidly
    setTimeout(() => {
      if (month === this.month.indexOf(this.selectedMonth)) {
        this.getList(month, this.year, date, true);
      }
    }, 300);


    // The current date should be highlighted each time we navigate back to the current month
    if (this.monthCount === new Date().getMonth() && this.year === new Date().getFullYear()) {
      date = new Date().getDate();
    }

    this.selectedDateButton = date;

    this.firstDay = new Date(year, month, 1).getDay(); // first day of the month

    const currentMonthLastDate = new Date(year, month + 1, 0).getDate();

    let lastMonthLastDate = new Date(year, month, 0).getDate(); // previous months last date

    let firstDate = lastMonthLastDate - this.firstDay + 2; // first date to be put in the array. This will be the date from the previous month

    if (this.firstDay === 0) { // The first day of the current month is on sunday. Mon to Tue are from last month
      firstDate -= 7;
    }

    let tempArr = [];
    // dates array is a 2D array. j is used to indicate to what index the first row has been filled.
    let j = 0;

    // Days from the previous month. For example 26 to 31.
    for (let i = firstDate; i <= lastMonthLastDate; i++) {
      tempArr.push(i);
      j++;
    }

    // this will be used to determine the first day of the slected month. Sunday, Monday etc.
    this.firstDayIndex = j;

    firstDate = 1;
    // first fill the current month and then the next month dates.
    for (let i = 0; i < 42; i++) {
      tempArr.push(firstDate);
      j++;

      firstDate++;

      if (firstDate > currentMonthLastDate) {
        firstDate = 1;
        this.lastDayIndex = i + this.firstDayIndex;
      }

      if (j === 7) { // each row of the dates array can have only 7 entries
        this.dates.push(tempArr)
        tempArr = [];
        j = 0;
      }
    }
  }

  getList(month: number, year: number, day: number, fetchList: boolean) {
    this.selectedDate.emit({
      day,
      month,
      year,
      fetchList
    });

    this.selectedDateButton = day;

  }

}
