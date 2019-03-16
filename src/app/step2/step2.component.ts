import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { ATM } from 'src/app/model/atm';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

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

  atmSel: ATM = new ATM();
  branch: Branch = null;
  brtype: string = "cashLink";

  siteList: string[] = [];
  ownershipTypeList: string[] = [];
  nwTypeList: string[] = [];
  oemList: string[] = [];
  modelList: string[] = [];
  msVendorList: string[] = [];
  cashRepList: string[] = [];
  phaseList: string[] = [];

  constructor(private mvsService: MvsServiceService,
              private _router: Router) { }

  ngOnInit() {
    this.mvsService.fetchCashBranches().subscribe(brIn => {
      console.log(brIn);
      this.cashbranchList = brIn;
    },
    err => {
      console.log(err);
    });

    this.mvsService.fetchOwnerBranches().subscribe(brIn => {
      console.log(brIn);
      this.ownerbranchList = brIn;
    },
    err => {
      console.log(err);
    });
    
    this.loadReferences();
  }

  updateATMs()
  {
    console.log(this.branch);
    console.log(this.brtype);

    this.mvsService.fetchAtmList(this.brtype, this.branch.branchId).subscribe(dataIn => {
      console.log(dataIn);
      this.atmList = dataIn;
    },
    err => {
      console.log(err);
    });
    
  }

  loadReferences()
  {
    
    this.mvsService.fetchFieldEntries("site").subscribe(en => {
      this.siteList = en;
    });

    this.mvsService.fetchFieldEntries("ownershipType").subscribe(en => {
      this.ownershipTypeList = en;
    });

    this.mvsService.fetchFieldEntries("networkType").subscribe(en => {
      this.nwTypeList = en;
    });

    this.mvsService.fetchFieldEntries("oemMake").subscribe(en => {
      this.oemList = en;
    });

    this.mvsService.fetchFieldEntries("model").subscribe(en => {
      this.modelList = en;
    });

    this.mvsService.fetchFieldEntries("msVender").subscribe(en => {
      this.msVendorList = en;
    });

    this.mvsService.fetchFieldEntries("cashRepType").subscribe(en => {
      this.cashRepList = en;
    });

    this.mvsService.fetchFieldEntries("phases").subscribe(en => {
      this.phaseList = en;
    });
  }

  nextPage()
  {
    console.log(this.atmSel);
    sessionStorage.setItem("atmSel", JSON.stringify(this.atmSel));
    this._router.navigate(["angstep3", this.branch.branchId]);
  }
}
