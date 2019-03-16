import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { ATM } from 'src/app/model/atm';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Step2Component implements OnInit {

  cashbranchList: Branch[] = [];
  ownerbranchList: Branch[] = [];
  atmList : ATM[] = [];

  atmSel: ATM = null;
  cashbranchin: Branch = null;
  brtype: string = "cashLink";

  constructor(private mvsService: MvsServiceService) { }

  ngOnInit() {
    this.mvsService.fetchCashBranches().subscribe(brIn => {
      console.log(brIn);
      this.cashbranchList = brIn;
    },
    err => {
      console.log(err);
    })
  }

  updateATMs()
  {
    console.log(this.cashbranchin);
    console.log(this.brtype);

    this.mvsService.fetchAtmList(this.brtype, this.cashbranchin.branchId).subscribe(dataIn => {
      console.log(dataIn);
      this.atmList = dataIn;
    },
    err => {
      console.log(err);
    });
    
  }

}
