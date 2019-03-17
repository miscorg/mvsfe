import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step2Component } from 'src/app/step2/step2.component';
import { Step1Component } from 'src/app/step1/step1.component';
import { Step3Component } from 'src/app/step3/step3.component';
import { DashboardComponent } from "src/app/dashboard/dashboard.component";

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'angstep1', component: Step1Component},
  {path: 'angstep2', component: Step2Component},
  {path: 'angstep3/:branchId', component: Step3Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
