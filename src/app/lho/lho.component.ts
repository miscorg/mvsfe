import { Component, OnInit } from '@angular/core';
import { LHO } from 'src/app/model/lho';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { MvsServiceService } from 'src/app/mvs-service.service';
import { LHOPeopleData } from 'src/app/model/lhopeople-data';
import { Pfhrms } from 'src/app/model/pfhrms';
import { Router } from '@angular/router';
import { Network } from 'src/app/model/network';
import { Region } from 'src/app/model/region';
import { Module } from 'src/app/model/module';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

const spinOptions: NgbModalOptions = { backdropClass: 'light-blue-backdrop',
backdrop: 'static',
centered: true,
keyboard: false,
windowClass: 'clearmodalbody' };

@Component({
  selector: 'app-lho',
  templateUrl: './lho.component.html',
  styleUrls: ['./lho.component.scss']
})
export class LhoComponent implements OnInit {

  lho: LHO = null;
  network: Network = null;
  chlho: LHO = null;
  chnetwork: Network = null;
  module: Module = null;
  region: Region = null;

  agmatmPF: Pfhrms = new Pfhrms();
  chMgr: Pfhrms = new Pfhrms();
  cmcsRbo: Pfhrms = new Pfhrms();
  
  lhoList: LHO[] = [];
  networkList: Network[] = [];
  chnetworkList: Network[] = [];
  moduleList: Module[] = [];
  regionList: Region[] = [];

  modalRef:NgbModalRef = null;
  spinRef:NgbModalRef = null;

  constructor(private mvsService: MvsServiceService,
              private modalService: NgbModal,
              private _router: Router) { }

  ngOnInit() {
    this.loadLhos();
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

  loadLhos()
  {
    this.mvsService.fetchLhoList().subscribe(lhoListJson => {
      this.lhoList = lhoListJson;
    });  
  }

  loadNetworks()
  {
    this.network = null;
    this.agmatmPF = new Pfhrms();
    if(this.lho)
    {
      this.mvsService.fetchNetworkList(this.lho.lhoId).subscribe(nwListJson => {
        this.networkList = nwListJson;
      });
    }
  }

  loadAGM()
  {
    if(this.network)
    {
      this.mvsService.fetchAGM(this.network.networkId).subscribe(agmjson => {
        console.log(agmjson);
        if(agmjson)
        {
          this.agmatmPF = agmjson;
        }
      });
    }
  }

  loadNetworksch()
  {
    this.chnetwork = null;
    this.loadModules();
    if(this.chlho)
    {
      this.mvsService.fetchNetworkList(this.chlho.lhoId).subscribe(nwListJson => {
        this.chnetworkList = nwListJson;
      });
    }
  }

  loadModules()
  {
    this.module = null;
    this.loadRegions();
    if(this.chnetwork)
    {
      this.mvsService.fetchModuleList(this.chnetwork.networkId).subscribe(moduleListJson => {
        this.moduleList = moduleListJson;
      });
    }
  }

  loadRegions()
  {
    this.region = null;
    this.chMgr = new Pfhrms();
    this.cmcsRbo = new Pfhrms();

    if(this.module)
    {
      this.mvsService.fetchRegionList(this.module.moduleId).subscribe(regionListJson => {
        this.regionList = regionListJson;
      });
    }
  }

  loadPeople()
  {
    if(this.region)
    {
      this.mvsService.fetchChMgr(this.region.regionId).subscribe(chMgrjson => {
        if(chMgrjson)
        {
          this.chMgr = chMgrjson;
        }
      });
    
      this.mvsService.fetchCmcsRbo(this.region.regionId).subscribe(cmcsjson => {
        if(cmcsjson)
        {
          this.cmcsRbo = cmcsjson;
        }
      });
    }

  }

  prevPage()
  {
    this._router.navigate([""]);
  }

  submitAlert(content)
  {
    this.modalRef = this.modalService.open(content, {centered: true});
  }

  submit(content)
  {
    this.modalRef.close('Submit');
    this.spinRef = this.modalService.open(content, spinOptions);
    let nwId = this.network ? this.network.networkId : null;
    let regionId = this.region ? this.region.regionId : null;
    this.mvsService.savePeople(nwId, regionId, this.agmatmPF, this.chMgr, this.cmcsRbo).subscribe(
      res => {
        console.log(res);
        this.spinRef.close();
        this._router.navigate([""]);
      },
      err => {
        console.log(err);
        this.spinRef.close();
      }
    )
  }
}
