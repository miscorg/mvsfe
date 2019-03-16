import { Component, OnInit } from '@angular/core';
import { Branch } from 'src/app/model/branch';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component implements OnInit {

  branchObj: Branch = null;
  
  constructor(private mvsService: MvsServiceService,
              private _route: ActivatedRoute) { }

  ngOnInit() {

    let branchId: string = this._route.snapshot.paramMap.get("branchId");

    this.mvsService.fetchBranch(branchId).subscribe(el => {
      console.log(el);
      this.branchObj = el;
    })
    
  }

}
