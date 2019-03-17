import { Component, OnInit } from '@angular/core';
import { ATMNetwork } from 'src/app/model/atmnw';
import { ATMAuxInfo } from 'src/app/model/atmaux';
import { Pfhrms } from 'src/app/model/pfhrms';
import { ATM } from 'src/app/model/atm';
import { Branch } from 'src/app/model/branch';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss']
})
export class Step4Component implements OnInit {

  atmObj: ATM = new ATM();
  branchObj: Branch = new Branch();
  atmNetwork: ATMNetwork = new ATMNetwork();
  atmAuxInfo: ATMAuxInfo = new ATMAuxInfo();
  branchManager: Pfhrms = new Pfhrms();
  atmOfficer: Pfhrms = new Pfhrms();

  constructor() { }

  ngOnInit() {

    this.atmObj = JSON.parse(sessionStorage.getItem("atmSel"));

    if(this.atmObj.atmNetwork) {
      this.atmNetwork = this.atmObj.atmNetwork;
    }

    if(this.atmObj.atmAuxInfo) {
      this.atmAuxInfo = this.atmObj.atmAuxInfo;
    }

    this.branchObj = JSON.parse(sessionStorage.getItem("branchObj"));
    this.branchManager = JSON.parse(sessionStorage.getItem("branchManager"));
    this.atmOfficer = JSON.parse(sessionStorage.getItem("atmOfficer"));

    console.log(this.branchManager);
    console.log(this.atmOfficer);
  }

}
