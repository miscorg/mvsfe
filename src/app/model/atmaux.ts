import { BranchType} from './branchtype';
import { BranchPeopleData } from 'src/app/model/branchpeopledata';
import { Branch } from 'src/app/model/branch';

export class ATMAuxInfo
{
  atmId: string;
  targetDate: string;
  tmkAvailable: boolean;
  tmkChecksum: boolean;
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
}
