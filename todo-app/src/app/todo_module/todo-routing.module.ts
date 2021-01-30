import {
  NgModule
} from "@angular/core";
import {
  RouterModule,
  Routes
} from "@angular/router";

import {
  TodoComponent
} from "./todo/todo.component";
import {
  MonthlyComponent
} from './todo/monthly/monthly.component';
import {
  DailyComponent
} from "./todo/daily/daily.component";

const routes: Routes = [{
  path: '',
  component: TodoComponent,
  children: [{
      path: 'monthly',
      component: MonthlyComponent,
      data: {animation: 'Monthly'}
    },
    {
      path: 'daily',
      component: DailyComponent,
      data: {animation: 'Daily'}
    }
  ]
}];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TodoRoutingModule {

}
