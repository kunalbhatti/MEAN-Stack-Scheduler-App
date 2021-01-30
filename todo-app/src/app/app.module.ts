import {
  BrowserModule
} from '@angular/platform-browser';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  NgModule
} from '@angular/core';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  FlexLayoutModule
} from '@angular/flex-layout';

import {
  AppComponent
} from './app.component';

import {
  CookieService
} from 'ngx-cookie-service';
import {
  ToastrModule
} from 'ngx-toastr';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, AppRoutingModule, FlexLayoutModule, ToastrModule.forRoot({
    maxOpened: 3,
    closeButton: true,
    
  })],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
