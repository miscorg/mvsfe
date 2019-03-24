import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { ATM } from 'src/app/model/atm';
import { Router, ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { ATMNetwork } from 'src/app/model/atmnw';
import { ATMAuxInfo } from 'src/app/model/atmaux';
import { FieldValues } from 'src/app/model/field-values';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Pincode } from 'src/app/model/pincode';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

const OWNER_KEY = 'ownershipType';
const PHASES_KEY = 'phases';
const OEM_MAKE_KEY = 'oemMake';
const NW_TYP_KEY = 'networkType';
const MODEL_KEY = 'model';
const ATM_TYPE_KEY = "atmType"
const MS_VENDOR_KEY = 'msVender';
const SUPPLIER_KEY = 'supplier';
const CASH_REP_KEY = 'cashRepType';
const CRA_AGENCY_KEY = 'craAgencyKey';
const OS_KEY = 'os';
const SITE_KEY = 'site';

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
  atmSeln: ATM = new ATM();
  atmDummy: ATM = new ATM();
  atmNetwork: ATMNetwork = new ATMNetwork();
  atmAuxInfo: ATMAuxInfo = new ATMAuxInfo();
  pinCode: Pincode = new Pincode();

  branch: Branch = new Branch();
  brtype: string = "cashLink";

  fieldVals: FieldValues[] = [];  
  ownershipTypeList: string[] = [];
  phaseList: string[] = [];
  oemList: string[] = [];
  modelList: string[] = [];
  osList: string[] = [];
  msVendorList: string[] = [];
  supplierList: string[] = [];
  cashRepList: string[] = [];
  craAgencyList: string[] = [];
  nwTypeList: string[] = [];
  siteList: string[] = [];
  
  auxFormGrp: FormGroup = null;

  backmove: boolean = false;

  constructor(private mvsService: MvsServiceService,
              private _fb: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router) { }

  ngOnInit() 
  {
    
    this.backmove = this._route.snapshot.paramMap.has("direction");

    if(this.backmove)
    {
      this.mvsService.fetchCashBranches().subscribe(brIn => {
        console.log(brIn);
        this.cashbranchList = Branch.fromJsonArray(brIn);
          let branchObj = Branch.fromJson(JSON.parse(sessionStorage.getItem("branchObj")));
          let branchObjFromList = this.cashbranchList.find(el => { return el.branchId == branchObj.branchId });
          if(branchObjFromList)
          {
            this.branch = Object.assign(branchObjFromList, branchObj);
            this.loadAtm();
          }
          else
          {
            this.mvsService.fetchOwnerBranches().subscribe(brIn => {
              console.log(brIn);
              this.ownerbranchList = brIn;
              let branchObj = Branch.fromJson(JSON.parse(sessionStorage.getItem("branchObj")));
              let branchObjFromList = this.cashbranchList.find(el => { return el.branchId == branchObj.branchId });
              if(branchObjFromList)
              {
                this.branch = Object.assign(branchObjFromList, branchObj);
                this.brtype = "owner";
                this.loadAtm();
              }    
            },
            err => {
              console.log(err);
            });                    
          }
      },
      err => {
        console.log(err);
      });
        
    }
    else
    {
      sessionStorage.clear();
      this.loadFieldValues();
      this.prepareFormGrp();
    }

  }

  get tmkChkSum(){
    return this.auxFormGrp.controls['tmkChkSum'];
  }

  prepareFormGrp()
  {
    let chkSum = this.atmAuxInfo.tmkChecksum;
    this.auxFormGrp = this._fb.group({
      'tmkChkSum' : [chkSum, [Validators.maxLength(6), Validators.pattern(/[0-9]+/)]]
    });    
  }

  loadAtm()
  {
    let atmSelObj = JSON.parse(sessionStorage.getItem("atmSel"));
    this.mvsService.fetchAtmList(this.brtype, this.branch.branchId).subscribe(dataIn => {
      console.log(dataIn);
      this.atmList = dataIn;
      let atmFromList = this.atmList.find(el => {return el.atmId == atmSelObj.atmId})
      if(atmFromList)
      {
        this.atmSel = ATM.copyJson(atmSelObj, atmFromList);              
        this.atmSeln = this.atmSel;
        console.log(this.atmSel);

        this.atmNetwork = this.atmSel.atmNetwork;
        this.atmAuxInfo = this.atmSel.atmAuxInfo;
        this.pinCode = this.atmSel.pincode;

        this.loadFieldValues();
        this.ownershipUpdtd();
        this.prepareFormGrp();
      }
    },
    err => {
      console.log(err);
    });
  }

  updateATMs(ev)
  {
    console.log(ev);
    this.branch = ev.item;
    console.log(this.branch);
    console.log(this.brtype);

    this.atmSeln = new ATM();
    this.atmSel = this.atmSeln;
    sessionStorage.removeItem("atmSel");
    sessionStorage.removeItem("branchObj");
    
    this.mvsService.fetchAtmList(this.brtype, this.branch.branchId).subscribe(dataIn => {
      console.log(dataIn);
      this.atmList = dataIn;
    },
    err => {
      console.log(err);
    });
    
  }

  updateATMData()
  {
    console.log(this.atmSeln);

    this.mvsService.fetchAtmData(this.atmSeln.atmId).subscribe(dt => {
      console.log(dt);
      this.atmSel = dt;

      if(this.atmSel.atmNetwork) 
      {
        this.atmNetwork = this.atmSel.atmNetwork;
      }
      else
      {
        this.atmSel.atmNetwork = this.atmNetwork;
      }

      if(this.atmSel.atmAuxInfo) 
      {
        this.atmAuxInfo = this.atmSel.atmAuxInfo;
      }
      else
      {
        this.atmSel.atmAuxInfo = this.atmAuxInfo;
      }

      if(this.atmSel.pincode) 
      {
        this.pinCode = this.atmSel.pincode;
      }
      else
      {
        this.atmSel.pincode = this.pinCode;
      }
      
    },
    err => {
      console.log(err);
    });
    // this.atmSel = this.atmSeln;
  }

  loadFieldValues()
  {
    this.mvsService.fetchFieldValues().subscribe(lst => {
      this.fieldVals = lst;

      this.fieldVals.forEach(el => {
        if(el.key == "site")
        {
          this.siteList.push(el.value);
        }
        else if(el.key == "ownershipType")
        {
          this.ownershipTypeList.push(el.value);
        }
      });

      this.ownershipUpdtd();
    });
  }

  fetchChildStrs(keyIn: string, valueIn: string, fieldValsIn: FieldValues[], childKey: string)
  {
    let fieldVal: FieldValues = fieldValsIn.find(el => {return el.key == keyIn && el.value == valueIn});
    if(fieldVal == null)
    {
      return [];
    }
    return fieldValsIn.filter(el => {return el.key == childKey && el.parentId == fieldVal.id}).map(el => el.value);    
  }

  ownershipUpdtd()
  {
    this.phaseList = this.fetchChildStrs(OWNER_KEY, this.atmSel.ownershipType, this.fieldVals, PHASES_KEY);
    this.nwTypeList = this.fetchChildStrs(OWNER_KEY, this.atmSel.ownershipType, this.fieldVals, NW_TYP_KEY);
    this.msVendorList = this.fetchChildStrs(OWNER_KEY, this.atmSel.ownershipType, this.fieldVals, MS_VENDOR_KEY);
    this.cashRepList = this.fetchChildStrs(OWNER_KEY, this.atmSel.ownershipType, this.fieldVals, CASH_REP_KEY);
    this.phaseUpdtd();
    this.cashRepUpdtd();
  }

  phaseUpdtd()
  {
    this.oemList = this.fetchChildStrs(PHASES_KEY, this.atmSel.phase, this.fieldVals, OEM_MAKE_KEY);
    this.makeUpdtd();
  }

  makeUpdtd()
  {
    this.modelList = this.fetchChildStrs(OEM_MAKE_KEY, this.atmSel.oem, this.fieldVals, MODEL_KEY);
    this.modelUpdtd();
  }

  modelUpdtd()
  {    
    this.osList = this.fetchChildStrs(MODEL_KEY, this.atmSel.model, this.fieldVals, OS_KEY);
    this.supplierList = this.fetchChildStrs(MODEL_KEY, this.atmSel.model, this.fieldVals, SUPPLIER_KEY);
    this.atmSel.atmType = this.fetchChildStrs(MODEL_KEY, this.atmSel.model, this.fieldVals, ATM_TYPE_KEY)[0];    
  }

  cashRepUpdtd()
  {
    this.craAgencyList = this.fetchChildStrs(CASH_REP_KEY, this.atmSel.model, this.fieldVals, CRA_AGENCY_KEY);
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

    this.mvsService.fetchFieldEntries("os").subscribe(en => {
      this.osList = en;
    });
  }
    
  searchCashBr = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(term => term.length < 4 ? [] : 
      this.mvsService.searchCashBranches(term).pipe(
        catchError(() => {
          return of([]);
        }))
    )
  );
  
  searchOwnerBr = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(term => term.length < 4 ? [] : 
      this.mvsService.searchCashBranches(term).pipe(
        catchError(() => {
          return of([]);
        }))
    )
  );

  brformatter = x => x.branchId;

  searchPinCode = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(term => term.length < 4 ? [] : 
      this.mvsService.searchPinCodes(term).pipe(
        catchError(() => {
          return of([]);
        }))
    )
  );

  pinFormatter = x => x.pincode;

  updatePinCode(ev)
  {
    this.pinCode = ev.item;
    this.atmSel.pincode = this.pinCode;
  }

  prevPage()
  {
    this._router.navigate(["angstep1"]);
  }

  nextPage()
  {

    console.log(this.auxFormGrp);
    if(this.auxFormGrp.invalid)
    {
      return;
    }

    this.atmSel.atmAuxInfo.tmkChecksum = this.auxFormGrp.controls['tmkChkSum'].value;
    console.log(this.atmSel);
    console.log(this.branch);
    sessionStorage.setItem("atmSel", JSON.stringify(this.atmSel));
    sessionStorage.setItem("branchObj", JSON.stringify(this.branch));
    this._router.navigate(["angstep3"]);
  }
}

export function chkSumValidator(nameRe: RegExp): ValidatorFn 
{
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'digOnly': {value: control.value}} : null;
  };
}