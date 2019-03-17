import { BranchType} from './branchtype';
import { BranchPeopleData } from 'src/app/model/branchpeopledata';
import { Branch } from 'src/app/model/branch';
import { ATMNetwork } from 'src/app/model/atmnw';
import { ATMAuxInfo } from 'src/app/model/atmaux';

export class ATM 
{
  atmId: string;
  atmType: string;
  siteType: string;
  ownershipType: string;
  networkType: string;
  oem: string;
  model: string;
  phase: string;
  msVendor: string;
  cashRepl: string;

  address1: string;
  address2: string;
  address3: string;
  village: string;
  taluk: string;
  subDistrict: string;
  district: string;
  state: string;
  popGroup: string;
  landmark: string;

  atmNetwork: ATMNetwork;
  atmAuxInfo: ATMAuxInfo;

  ownerBranch: Branch;
  cashLinkBranch: Branch;

}
