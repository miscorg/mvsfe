import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ATMNetwork } from 'src/app/model/atmnw';
import { ATMAuxInfo } from 'src/app/model/atmaux';
import { Pfhrms } from 'src/app/model/pfhrms';
import { ATM } from 'src/app/model/atm';
import { Branch } from 'src/app/model/branch';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MvsServiceService } from 'src/app/mvs-service.service';

const spinOptions: NgbModalOptions = { backdropClass: 'light-blue-backdrop',
                      backdrop: 'static',
                      centered: true,
                      keyboard: false,
                      windowClass: 'clearmodalbody' };

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Step4Component implements OnInit {

  atmObj: ATM = new ATM();
  branchObj: Branch = new Branch();
  atmNetwork: ATMNetwork = new ATMNetwork();
  atmAuxInfo: ATMAuxInfo = new ATMAuxInfo();
  branchManager: Pfhrms = new Pfhrms();
  atmOfficer: Pfhrms = new Pfhrms();

  modalRef:NgbModalRef = null;
  spinRef:NgbModalRef = null;

  constructor(private mvsService: MvsServiceService,
              private modalService: NgbModal,
              private _router: Router) { }

  ngOnInit() {

    this.atmObj = JSON.parse(sessionStorage.getItem("atmSel"));

    if(this.atmObj.atmNetwork) {
      this.atmNetwork = this.atmObj.atmNetwork;
    }

    if(this.atmObj.atmAuxInfo) {
      this.atmAuxInfo = this.atmObj.atmAuxInfo;
    }

    this.branchObj = JSON.parse(sessionStorage.getItem("branchObj"));
    this.branchManager = this.branchObj.branchPeopleData.branchManager;
    this.atmOfficer = this.branchObj.branchPeopleData.atmOfficer;
    // this.branchManager = JSON.parse(sessionStorage.getItem("branchManager"));
    // this.atmOfficer = JSON.parse(sessionStorage.getItem("atmOfficer"));

    console.log(this.branchManager);
    console.log(this.atmOfficer);
  }

  submitAlert(content) 
  {
    this.modalRef = this.modalService.open(content, {centered: true});
  }

  prevPage()
  {
    this._router.navigate(["angstep3"]);
  }

  submit(content)
  {
    this.modalRef.close('Submit');
    this.spinRef = this.modalService.open(content, spinOptions);

    if(this.atmObj.cashLinkBranch != null && this.atmObj.cashLinkBranch.branchId == this.branchObj.branchId)
    {
      this.atmObj.cashLinkBranch = this.branchObj;
    }
    console.log(this.atmObj);
    this.mvsService.saveAtm(this.atmObj).subscribe(out => {
      console.log(out);
      this.spinRef.close();
      this._router.navigate(["angstep1"]);
    },
    err => {
      this.spinRef.close();
      console.log(err);
    });
  }
}
