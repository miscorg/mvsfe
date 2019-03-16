import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Step2Component } from 'src/app/step2/step2.component';
import { Step1Component } from 'src/app/step1/step1.component';

const routes: Routes = [
  {path: '', component: Step1Component},
  {path: 'angstep2', component: Step2Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
