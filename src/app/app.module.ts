import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Step2Component } from './step2/step2.component';
import { Step1Component } from './step1/step1.component';
import { Step3Component } from './step3/step3.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Step4Component } from './step4/step4.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    Step2Component,
    Step1Component,
    Step3Component,
    DashboardComponent,
    Step4Component,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
