import { Component, OnInit } from '@angular/core';
import { LHO } from 'src/app/model/lho';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { LHOPeopleData } from 'src/app/model/lhopeople-data';
import { Pfhrms } from 'src/app/model/pfhrms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lho',
  templateUrl: './lho.component.html',
  styleUrls: ['./lho.component.scss']
})
export class LhoComponent implements OnInit {

  lho: LHO = new LHO();
  agmatmPF: Pfhrms = new Pfhrms();
  
  constructor(private mvsService: MvsServiceService,
              private _router: Router) { }

  ngOnInit() {
  }

  searchHrms = (text$: Observable<string>) =>
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

  lhoFormatter = x => x.pfId;

  updateLhoPplData(ev)
  {
    console.log(ev);
  }

  prevPage()
  {
    this._router.navigate([""]);
  }

  submit()
  {
    
  }
}
