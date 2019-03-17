import { Component, OnInit } from '@angular/core';
import { MvsServiceService } from "src/app/mvs-service.service";
import { Router } from "@angular/router";
import { DashboardList } from "src/app/model/dashboardList";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  dashboardData:DashboardList[]=[];
  constructor(private mvsService: MvsServiceService,private _router: Router) { }

  ngOnInit() {
    this.mvsService.fetchDashboardlist().subscribe(response => {
      this.dashboardData=response;
    })
  }
  gotoStep(){
    this._router.navigate(['/angstep1'])
  }
  dataSet(){
    this._router.navigate(['/angstep2'])
  }
}