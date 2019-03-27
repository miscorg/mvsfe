import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ATM } from 'src/app/model/atm';
import { Pfhrms } from 'src/app/model/pfhrms';
import { LhoWrapper } from 'src/app/model/lho-wrapper';

let options = { headers: new HttpHeaders().set('Content-Type', 'application/json').append('Access-Control-Allow-Origin', '*') }
// const mvsUrl = 'http://localhost:9090';
const mvsUrl = environment.serviceUrl;

@Injectable({
  providedIn: 'root'
})
export class MvsServiceService {

  constructor(private httpClient: HttpClient) {}

  public fetchCashBranches(): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/branch/cashlink", options);
  }

  public fetchOwnerBranches(): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/branch/owner", options);
  }
    
  public fetchAtmList(branchType:string, branchId: number): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/atm/atmList/" + branchType + "/" + branchId, options);
  }
    
  public fetchAtmData(atmId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/atm/" + atmId, options);
  }

  public fetchBranch(branchId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/branch/branchObj/" + branchId, options);
  }

  public fetchFieldEntries(fieldName: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/atm/field/" + fieldName, options);
  }

  public fetchFieldValues(): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/atm/fieldVals/", options);
  }

  public fetchDashboardlist(): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/dashboard" , options);
  }
  
  public searchMgr(mrTxt: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/user/userSearch/" + mrTxt, options);
  }
  
  public searchCashBranches(brTxt: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/branch/cashlink/" + brTxt, options);
  }
  
  public searchOwnerBranches(brTxt: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/branch/owner/" + brTxt, options);
  }

  public searchPinCodes(pinStr: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/atm/pincode/" + pinStr, options);
  }

  public fetchLhoList(): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/lho/", options);
  }

  public fetchNetworkList(lhoId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/lho/networks/" + lhoId, options);
  }

  public fetchModuleList(lhoId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/lho/modules/" + lhoId, options);
  }

  public fetchRegionList(moduleId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/lho/regions/" + moduleId, options);
  }

  public fetchAGM(nwId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/lho/agm/" + nwId, options);    
  }

  public fetchChMgr(regionId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/lho/chMgr/" + regionId, options);    
  }

  public fetchCmcsRbo(regionId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/lho/cmcsRbo/" + regionId, options);    
  }

  public savePeople(nwId: string, regionId: string, agmIn: Pfhrms, chMgrIn: Pfhrms, cmcsRboIn: Pfhrms): Observable<any>
  {
    console.log(nwId);
    console.log(regionId);
    let lhoWrapper: LhoWrapper = new LhoWrapper();
    lhoWrapper.agm = agmIn;
    lhoWrapper.chMgr = chMgrIn;
    lhoWrapper.cmcsRbo = cmcsRboIn;

    return this.httpClient.put(mvsUrl + "/lho/save/" + nwId + "/" + regionId , lhoWrapper, options);
  }

  public saveAtm(atmIn: ATM): Observable<any>
  {
    console.log(atmIn);
    return this.httpClient.put(mvsUrl + "/atm/"+atmIn.atmId , atmIn, options);
  }

}
