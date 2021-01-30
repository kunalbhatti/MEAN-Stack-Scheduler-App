import {
  NgModule
} from "@angular/core";

import {
  CommonModule
} from "@angular/common";

import {
  TodoRoutingModule
} from "./todo-routing.module";

import {
  FormsModule
} from "@angular/forms";

import {
  TodoComponent
} from './todo/todo.component';
import {
  CalendarComponent
} from './todo/monthly/calendar/calendar.component';
import {
  ListComponent
} from './todo/monthly/list/list.component';
import {
  MonthlyComponent
} from './todo/monthly/monthly.component';
import {
  DailyComponent
} from './todo/daily/daily.component';


@NgModule({
  declarations: [TodoComponent, CalendarComponent, ListComponent, MonthlyComponent, DailyComponent],
  imports: [CommonModule, TodoRoutingModule, FormsModule],
})

export class TodoModule {

}
