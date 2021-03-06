import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ATM } from 'src/app/model/atm';
import { Pfhrms } from 'src/app/model/pfhrms';
import { ATMAuxInfo } from 'src/app/model/atmaux';
import { Observable, of } from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap, catchError} from 'rxjs/operators';
import { BranchPeopleData } from 'src/app/model/branchpeopledata';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ATMNetwork } from 'src/app/model/atmnw';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class Step3Component implements OnInit {

  branchObj: Branch = new Branch();
  atmObj: ATM = new ATM();
  atmAuxInfo: ATMAuxInfo = new ATMAuxInfo();
  atmNetwork: ATMNetwork = new ATMNetwork();

  branchManager: Pfhrms = new Pfhrms();
  atmOfficer: Pfhrms = new Pfhrms();
  
  constructor(private mvsService: MvsServiceService,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() {

    // let branchId: string = this._route.snapshot.paramMap.get("branchId");
    // console.log(branchId);

    // this.mvsService.fetchBranch(branchId).subscribe(el => {
    //   console.log(el);
    //   this.branchObj = el;
    //   this.branchManager = this.branchObj.branchPeopleData.branchManager;
    //   this.atmOfficer = this.branchObj.branchPeopleData.atmOfficer;
    // });

    // let backmove: boolean = this._route.snapshot.paramMap.has("direction");

    this.atmObj = ATM.fromJson(JSON.parse(sessionStorage.getItem("atmSel")));
    if(this.atmObj.atmAuxInfo)
    {
      this.atmAuxInfo = this.atmObj.atmAuxInfo;
    }
    else {
      this.atmObj.atmAuxInfo = this.atmAuxInfo;
    }

    if(this.atmObj.atmNetwork)
    {
      this.atmNetwork = this.atmObj.atmNetwork;
    }
    else {
      this.atmObj.atmNetwork = this.atmNetwork;
    }

    this.branchObj = JSON.parse(sessionStorage.getItem("branchObj"));
    if(this.branchObj.branchPeopleData)
    {
      if(this.branchObj.branchPeopleData.branchManager)
      {
        this.branchManager = this.branchObj.branchPeopleData.branchManager;
      }
      else
      {
        this.branchObj.branchPeopleData.branchManager = this.branchManager;
      }

      if(this.branchObj.branchPeopleData.atmOfficer)
      {
        this.atmOfficer = this.branchObj.branchPeopleData.atmOfficer;
      }
      else
      {
        this.branchObj.branchPeopleData.atmOfficer = this.atmOfficer;
      }
    }
    else
    {
      this.branchObj.branchPeopleData = new BranchPeopleData();
      this.branchObj.branchPeopleData.branchManager = this.branchManager;
      this.branchObj.branchPeopleData.atmOfficer = this.atmOfficer;
    }
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(term => term.length < 2 ? [] : 
      this.mvsService.searchMgr(term).pipe(
        catchError(() => {
          return of([]);
        }))
    )
  )

  formatter = x => x.pfId;
    
  prevPage()
  {
    this._router.navigate(["angstep2/fromnext"]);
  }

  savePage(): boolean
  {
    this.branchObj.branchPeopleData.branchManager = this.branchManager;
    this.branchObj.branchPeopleData.atmOfficer = this.atmOfficer;
    console.log(this.branchObj);
    console.log(this.atmObj);
    // sessionStorage.setItem("branchManager", JSON.stringify(this.branchManager));
    // sessionStorage.setItem("atmOfficer", JSON.stringify(this.atmOfficer));
    sessionStorage.setItem("branchObj", JSON.stringify(this.branchObj));
    sessionStorage.setItem("atmSel", JSON.stringify(this.atmObj));
    return true;
  }

  nextPage()
  {        
    this.savePage();
    this._router.navigate(["angstep4"]);
  }
 
}
