import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';

import {
  MediaService
} from './../../../services/media.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {

  selectedDate: {
    day: number,
    month: number,
    year: number,
    fetchList: boolean
  }

  screenSize: string;

  pageScrolled: boolean

  markedDates: number[];
  
  month: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor(private mediaService: MediaService) {}
  
  // register the scroll
  @HostListener('window:scroll', ['$event']) onScrollEvent(event){
    
    if(event.target.scrollTop > 1) {
      this.pageScrolled = true;
    } else {
      this.pageScrolled = false;
    }
  } 

  ngOnInit(): void {
    this.mediaService.getScreenSize().subscribe(
      mq => {
        this.screenSize = mq[0].mqAlias;
      }
    );
  }

  setDate(selectedDate: {
    day: number,
    month: number,
    year: number,
    fetchList: boolean
  }) {
    this.selectedDate = selectedDate;
  }

  setMarkedDates(markedDates: number[]) {
    this.markedDates = markedDates;
  }

}
