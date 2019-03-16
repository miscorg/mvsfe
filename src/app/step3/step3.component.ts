import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ATM } from 'src/app/model/atm';
import { Pfhrms } from 'src/app/model/pfhrms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  branchObj: Branch = new Branch();
  atmObj: ATM = new ATM();

  branchManager: Pfhrms = new Pfhrms();
  atmOfficer: Pfhrms = new Pfhrms();
  
  constructor(private mvsService: MvsServiceService,
              private _route: ActivatedRoute) { }

  ngOnInit() {

    let branchId: string = this._route.snapshot.paramMap.get("branchId");
    console.log(branchId);

    this.mvsService.fetchBranch(branchId).subscribe(el => {
      console.log(el);
      this.branchObj = el;
      this.branchManager = this.branchObj.branchPeopleData.branchManager;
      this.atmOfficer = this.branchObj.branchPeopleData.atmOfficer;
    });

    this.atmObj = JSON.parse(sessionStorage.getItem("atmSel"));
    
  }

}
