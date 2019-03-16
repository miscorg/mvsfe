import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

let options = { headers: new HttpHeaders().set('Content-Type', 'application/json').append('Access-Control-Allow-Origin', '*') }
const mvsUrl = 'http://localhost:9090';

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
    return this.httpClient.get(mvsUrl + "/api/atmList/" + branchType + "/" + branchId, options);
  }

  public fetchBranch(branchId: string): Observable<any>
  {
    return this.httpClient.get(mvsUrl + "/branch/branchObj/" + branchId, options);
  }

}
