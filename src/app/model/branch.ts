import { BranchType} from './branchtype';
import { BranchPeopleData } from 'src/app/model/branchpeopledata';

export class Branch {

  branchId : number;
  branchName: string;
  branchAddress1: string;
  branchAddress2: string;
  branchAddress3: string;
  branchAddress4: string;
  branchPinCode: number;
  branchPhoneNumber: string;
  stateCode: number;
  branchEmailId: string;

  branchType: BranchType;
  branchPeopleData: BranchPeopleData;

  static fromJson(jsonStr)
  {
    return Object.assign(new Branch(), jsonStr);
  }

  static fromJsonArray(jsonStrArr: any[])
  {
    let branches: Branch[] = [];
    jsonStrArr.map(el => {
      branches.push(Branch.fromJson(el))
    });
    return branches;
  }
  
}
