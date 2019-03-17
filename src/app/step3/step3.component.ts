import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ATM } from 'src/app/model/atm';
import { Pfhrms } from 'src/app/model/pfhrms';
import { ATMAuxInfo } from 'src/app/model/atmaux';
import { Observable, of } from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap, catchError} from 'rxjs/operators';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  branchObj: Branch = new Branch();
  atmObj: ATM = new ATM();
  atmAuxInfo: ATMAuxInfo = new ATMAuxInfo();

  branchManager: Pfhrms = new Pfhrms();
  atmOfficer: Pfhrms = new Pfhrms();

  careTaker: boolean;
  braille: boolean;
  surveillence: boolean;
  corner: boolean;
  cashOutSrc: boolean;
  
  constructor(private mvsService: MvsServiceService,
              private _route: ActivatedRoute,
              private _router: Router) { }

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
    if(this.atmObj.atmAuxInfo)
    {
      this.atmAuxInfo = this.atmObj.atmAuxInfo;
    }
    else {
      this.atmObj.atmAuxInfo = this.atmAuxInfo;
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

  formatter = (x: {name: string}) => x.name;
  
  nextPage()
  {    
    console.log(this.careTaker);
    console.log(this.braille);
    console.log(this.surveillence);
    console.log(this.corner);
    console.log(this.cashOutSrc);
    
    sessionStorage.setItem("branchManager", JSON.stringify(this.branchManager));
    sessionStorage.setItem("atmOfficer", JSON.stringify(this.atmOfficer));
    sessionStorage.setItem("branchObj", JSON.stringify(this.branchObj));
    sessionStorage.setItem("atmSel", JSON.stringify(this.atmObj));
    this._router.navigate(["angstep4"]);
  }
 
}
