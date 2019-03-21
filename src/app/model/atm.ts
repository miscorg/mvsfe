import { BranchType} from './branchtype';
import { BranchPeopleData } from 'src/app/model/branchpeopledata';
import { Branch } from 'src/app/model/branch';
import { ATMNetwork } from 'src/app/model/atmnw';
import { ATMAuxInfo } from 'src/app/model/atmaux';

export class ATM 
{
  atmId: string;
  ownershipType: string;
  phase: string;
  oem: string;
  model: string;
  atmType: string;
  os: string;
  supplier: string;
  msVendor: string;
  cashRepl: string;
  craAgency: string;
  networkType: string;
  siteType: string;
  
  address1: string;
  address2: string;
  address3: string;
  village: string;
  taluk: string;
  subDistrict: string;
  district: string;
  state: string;
  pincode: string;
  popGroup: string;
  landmark: string;  

  atmNetwork: ATMNetwork;
  atmAuxInfo: ATMAuxInfo;

  ownerBranch: Branch;
  cashLinkBranch: Branch;

  public static fromJson(jsonStr: any): ATM
  {
    if(jsonStr == null)
    {
      return new ATM();
    }
    return Object.assign(new ATM(), jsonStr, {atmAuxInfo : ATMAuxInfo.fromJson(jsonStr.atmAuxInfo)});
  }

  public static copyJson(fromObj: ATM, toObj: ATM): ATM
  {
    if(fromObj == null)
    {
      return new ATM();
    }
    if(toObj == null)
    {
      toObj = new ATM();
    }
    return Object.assign(toObj, fromObj, {atmAuxInfo : ATMAuxInfo.copyJson(toObj.atmAuxInfo, fromObj.atmAuxInfo)})
  }
}
