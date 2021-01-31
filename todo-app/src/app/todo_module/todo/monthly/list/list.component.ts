import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import {
  NgForm
} from '@angular/forms';

import {
  first
} from 'rxjs/operators';

import {
  TodoItem
} from './../../../../models/todo.model';

import {
  MediaService
} from '../../../../services/media.service';

import {
  AppService
} from './../../../../services/app.service';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { NotificationService } from 'src/app/services/notification.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('list', [
      state('in',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(800px)'
        }), animate(500)
      ]),
      transition('* => void', [
        animate(500, style({
          opacity: 1,
          transform: 'translateX(600px)'
        }))
      ])
    ]),


  ]
})
export class ListComponent implements OnInit, OnChanges {

  screenSize: string;
  loading: boolean;
  @Input() toggleMode: string;

  // Used by form for creating the time input
  hours: string[] = [];
  minutes: string[] = [];
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  today: Date;
  // this is a temp array which will be emitted using markedDated. Indicates all the dates where there is an entry
  markedDatesArr: number[] = [];
  @Output() markedDates = new EventEmitter < number[] > ();

  // each time the user selects a date on the calendar, the selected date is emitted. When the program boots for the first time,
  // the current date is emitted with fetchList as true.
  @Input() selectedDate: {
    day: number,
    month: number,
    year: number,
    fetchList: boolean
  }
  // The items fetched from the DB are stored in this variable.
  todoItems: TodoItem[] = [];
  noItemFound: boolean;

  // border id's
  borderTopId: number;
  borderBottomId: number;
  borderMidId: number[] = [];

  // Selected item is set each time the user wants to either delete or update an item. When the user clicks the edit or delete button
  // selectedItem is set to that item.
  selectedItem: TodoItem;

  constructor(private mediaService: MediaService, private appService: AppService, private notificationService: NotificationService) {}

  ngOnInit(): void {

    this.mediaService.getScreenSize().subscribe(
      mq => {
        this.screenSize = mq[0].mqAlias;
      }
    );

    this.today = new Date();

    this.loading = false;

    // concatinating 0 to all the entries less than 10. We want 01 instead of 1.
    for (let i = 0; i < 24; i++) {
      let hour = i.toString();
      if (i >= 0 && i <= 9) {
        hour = '0' + i
      }
      this.hours.push(hour);
    }
    for (let i = 0; i <= 60; i++) {
      let minute = i.toString();
      if (i >= 0 && i <= 9) {
        minute = '0' + i
      }
      this.minutes.push(minute);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedDate) {
      if (this.selectedDate.fetchList) {
        this.loading = true;
        this.todoItems = [];
        this.markedDatesArr = [];

        this.appService.getPost({
          day: this.selectedDate.day,
          month: this.selectedDate.month,
          year: this.selectedDate.year,
          daily: this.toggleMode === 'daily'
        }).subscribe(
          (items: TodoItem[]) => {
            this.todoItems = items;
            this.updateNoItemFound();
            if(this.todoItems.length === 0) {
              this.noItemFound = true;
            } else {
              this.noItemFound = false;
            }
            
            // sorting the todo entries by date and time
            this.sortItems(this.todoItems);

            for (let item of items) {
              this.markedDatesArr.push(item.date.day);
            }
            
            this.markedDates.emit(this.markedDatesArr);
  
            
            if(this.toggleMode === 'daily') {
              this.refreshBorderPosition();
              setInterval(() => {
                // every minute the time border will be refreshed
                if(new Date().getSeconds() === 0){
                  this.refreshBorderPosition();
                }
              }, 1000);
            }
  
            this.loading = false;
          }, (errorMessage: string) => {
            this.showToast(errorMessage, 'Error!!'); 
          }
        );
      }
    }
  }


  addItem(f: NgForm): void {

    let hour = +f.value.hour;
    let minute = +f.value.minute;

    const body = {
      task: f.value.task,
      date: {
        day: +f.value.date,
        month: +f.value.month,
        year: +this.selectedDate.year
      },
      time: {
        hour,
        minute
      }
    }

    this.appService.addPost(body).pipe(first()).subscribe(
      (item: TodoItem) => {
        this.todoItems.push(item);
        this.updateNoItemFound();
        this.sortItems(this.todoItems);

        this.markedDatesArr.push(body.date.day);
        this.markedDates.emit(this.markedDatesArr);

        
        if(this.toggleMode === 'daily') {
          this.refreshBorderPosition();
        }

        this.showToast('Item created successfully.', 'success');

      }, (errorMessage: string) => {
        this.showToast(errorMessage, 'Error!!');  
      }
    );

    this.hideModal('closeCreateModal');
  }

  updateItem(id: string, f: NgForm): void {

    // remove the old date from the markedDatesArr
    let dateIndex = this.markedDatesArr.indexOf(this.selectedItem.date.day);
    this.markedDatesArr.splice(dateIndex, 1);

    let hour = +f.value.hour;
    let minute = +f.value.minute;

    const body = {
      task: f.value.task,
      date: {
        day: +f.value.date,
        month: +f.value.month,
        year: this.selectedItem.date.year
      },
      time: {
        hour,
        minute
      }
    }

    this.appService.updatePost(id, body).subscribe(
      (result: {
        updated: boolean,
        body: TodoItem
      }) => {
        if (result.updated) {

          // finding and updating the item if the item has been rescheduled to a different month
          if (result.body.date.month === this.selectedDate.month) {

            for (let item of this.todoItems) {
              if (item._id === id) {
                item.task = result.body.task;
                item.date = result.body.date;
                item.time = result.body.time;

                this.markedDatesArr.push(+item.date.day);
                this.sortItems(this.todoItems);
                break;
              }
            }
          }

          // remove item from the list if the item has been rescheduled to a different month
          if (result.body.date.month !== this.selectedDate.month) {
            let itemIndex = 0;
            for (let item of this.todoItems) {
              if (item._id === id) {
                this.todoItems.splice(itemIndex, 1);
                break;
              }
              itemIndex++;
            }
          }

          if(this.toggleMode === 'daily') {
            this.refreshBorderPosition();
          }

          this.updateNoItemFound();

          this.markedDates.emit(this.markedDatesArr);
          this.showToast('Item updated successfully.', 'success');

          // #closeUpdateModal button in the form will call resetUpdateFormOnClose().
          // should be called only from here.
          this.hideModal('closeUpdateModal');
        }

      }, (errorMessage: string) => {
        this.showToast(errorMessage, 'Error!!');  
      });
  }

  deleteItem(id: string): void {

    this.appService.deletePost(id).subscribe(
      (result: {
        deleted: boolean
      }) => {
        if (result.deleted) {

          let dateIndex = this.markedDatesArr.indexOf(this.selectedItem.date.day);
          this.markedDatesArr.splice(dateIndex, 1);
          this.markedDates.emit(this.markedDatesArr);

          let itemIndex = 0;
          for (let item of this.todoItems) {
            if (item._id === id) {
              break;
            }
            itemIndex++;
          }

          if (itemIndex !== this.todoItems.length) {
            this.todoItems.splice(itemIndex, 1);
          }

          if(this.toggleMode === 'daily') {
            this.refreshBorderPosition();
          }
          this.updateNoItemFound();

          this.showToast('Item deleated successfully.', 'success');
        }
      }, (errorMessage: string) => {
        this.showToast(errorMessage, 'Error!!');  
      }
    );
  }

  //Utility Functions

  getDatesArray(month: number): number[] {
    let dates: number[] = [];

    const date = new Date();

    // last date of the month
    let lastDate = new Date(this.selectedDate?.year, +month + 1, 0).getDate();

    for (let i = 1; i < lastDate + 1; i++) {
      dates.push(i);
    }

    return dates;
  }

  hideModal(id: string): void {
    document.getElementById(id).click();

  }

  showToast(message: string, title: string) {
      this.notificationService.showToast(message, title);
  }

  resetUpdateFormOnClose(rf: NgForm): void {
    rf.controls['date'].setValue(this.selectedItem.date.day);
    rf.controls['month'].setValue(this.selectedItem.date.month);
    rf.controls['hour'].setValue(this.formatTime(this.selectedItem.time.hour));
    rf.controls['minute'].setValue(this.formatTime(this.selectedItem.time.minute));
  }

  resetCreateFormOnClose(rf: NgForm): void {
    rf.controls['task'].reset();
    rf.controls['date'].setValue("1");
    rf.controls['month'].setValue(this.selectedDate.month);
    rf.controls['hour'].setValue(this.formatTime(0));
    rf.controls['minute'].setValue(this.formatTime(0));
  }

  formatTime(time: number): string | number {
    if (time < 10) {
      return '0' + time;
    }
    return time;
  }


  getCreateModalDefaultDate(month: number): any {
    if (this.selectedDate?.day) {
      if (+month != +this.selectedDate?.month) {
        return "1";
      }
      return this.selectedDate?.day;
    }

    return "1";
  }

  getUpdateModalDefaultDate(month: number): any {
    if (this.selectedItem) {
      if (+month !== +this.selectedItem.date.month) {
        // while updating if we want to reschedule the task to some other month, set the default date of that month to 1
        return "1";
      }

      return this.selectedItem.date.day;
    }

    return "1";
  }

  sortItems(itemList: TodoItem[]) {

    for (let item of itemList) {
      { //new Date('2011-04-11T10:20:30Z')
        item['dateF'] = new Date(`${item.date.year}-${this.formatTime(item.date.month + 1)}-${this.formatTime(item.date.day)}T${this.formatTime(item.time.hour)}:${this.formatTime(item.time.minute)}:00Z`);
      }

      itemList.sort((a: any, b: any) => {
        return a.dateF - b.dateF;
      });

    }
  }

  updateNoItemFound() {
    if(this.todoItems.length === 0) {
      this.noItemFound = true;
    } else {
      this.noItemFound = false;
    }
  }


  refreshBorderPosition(){

    this.borderMidId = [];
    let itemTimeIndex: number[] = [];
    let i = 0;
    
    for(let item of this.todoItems) {
      if(item.time.hour === new Date().getHours()) {
        itemTimeIndex.push(i);
      }
      i++;
    }

    this.borderTopId = itemTimeIndex[0];
    this.borderBottomId = itemTimeIndex[itemTimeIndex.length - 1];

    i = itemTimeIndex[0];

    for(let index of itemTimeIndex) {
      // first get the item that is closes to the current minute
      if(this.todoItems[index].time.minute < new Date().getMinutes()) {
        this.borderMidId[0] = i; 
      }

      // in case there are items in the current minute, add them to the array
      if(this.todoItems[index].time.minute === new Date().getMinutes()) {
        this.borderMidId.push(i);
      }

      // exit if the scheduled time is greater that the current time
      if(this.todoItems[index].time.minute > new Date().getMinutes()) {
        break;
      }
      
      i++
    }
    // Set the first index value to -1 in case there is more that 1 item in the current minute
    if(this.borderMidId.length > 1 && this.todoItems[this.borderMidId[0]].time.minute !== new Date().getMinutes()) {
      this.borderMidId[0] = -1;
    }
    
  }
}
