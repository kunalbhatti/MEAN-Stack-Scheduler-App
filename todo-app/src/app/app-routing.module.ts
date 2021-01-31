import {
  NgModule
} from "@angular/core";

import {
  RouterModule,
  Routes
} from "@angular/router";

import {
  AuthGuard
} from "./guards/auth.guard";
import {
  LoggedInGuard
} from "./guards/logged-in.guard";
import {
  PageNotFoundComponent
} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'todo',
    redirectTo: '/todo/monthly',
    pathMatch: 'full'
  }
  ,{
    path: 'auth',
    loadChildren: () => import('./auth_module/auth.module').then(m => m.AuthModule),
    canActivate: [LoggedInGuard],
    data: {
      animation: 'LoginPage'
    }
  },
  {
    path: 'todo',
    loadChildren: () => import('./todo_module/todo.module').then(m => m.TodoModule),
    canActivate: [AuthGuard],
    data: {
      animation: 'TodoPage'
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
