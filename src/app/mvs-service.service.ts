import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ATM } from 'src/app/model/atm';

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
  
  public fetchDashboardlist(): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/api/dashboard" , options);
  }
  
  public searchMgr(mrTxt: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/user/userSearch/" + mrTxt, options);
  }

  public saveAtm(atmIn: ATM): Observable<any>
  {
    console.log(atmIn);
    return this.httpClient.put(mvsUrl + "/atm/"+atmIn.atmId , atmIn, options);
  }
}
