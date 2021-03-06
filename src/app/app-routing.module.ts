import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step2Component } from 'src/app/step2/step2.component';
import { Step1Component } from 'src/app/step1/step1.component';
import { Step3Component } from 'src/app/step3/step3.component';
import { DashboardComponent } from "src/app/dashboard/dashboard.component";
import { Step4Component } from 'src/app/step4/step4.component';
import { LhoComponent } from 'src/app/lho/lho.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'angstep1', component: Step1Component},
  {path: 'angstep2', component: Step2Component},
  {path: 'angstep2/:direction', component: Step2Component},
  {path: 'angstep3', component: Step3Component},
  {path: 'angstep4', component: Step4Component},
  {path: 'lhodata', component: LhoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
