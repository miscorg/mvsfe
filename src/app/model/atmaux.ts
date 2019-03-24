import { BranchType} from './branchtype';
import { BranchPeopleData } from 'src/app/model/branchpeopledata';
import { Branch } from 'src/app/model/branch';

export class ATMAuxInfo
{
  atmId: string;
  targetDate: Date;
  tmkAvailable: boolean;
  tmkChecksum: string;
  auxField1: boolean;
  auxField2: boolean;
  auxField3: boolean;
  auxField4: boolean;
  auxField5: boolean;
  auxField6: boolean;
  auxField7: boolean;
  auxField8: boolean;
  auxField9: boolean;
  auxField10: boolean;

  public static fromJson(jsonStr: any): ATMAuxInfo
  {
    if(jsonStr == null)
    {
      return new ATMAuxInfo();
    }
    return Object.assign(new ATMAuxInfo(), jsonStr, {targetDate : jsonStr.targetDate == null ? null: new Date(jsonStr.targetDate)})
  }

  public static copyJson(fromObj: ATMAuxInfo, toObj: ATMAuxInfo): ATMAuxInfo
  {
    if(fromObj == null)
    {
      return new ATMAuxInfo();
    }
    if(toObj == null)
    {
      toObj = new ATMAuxInfo();
    }
    return Object.assign(toObj, fromObj, {targetDate : fromObj == null ? new ATMAuxInfo() : fromObj.targetDate})
  }
}
