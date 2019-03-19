import { BranchType} from './branchtype';
import { BranchPeopleData } from 'src/app/model/branchpeopledata';
import { Branch } from 'src/app/model/branch';

export class ATMNetwork
{
  atmId: string;
  ipAddress: string;
  subnet: string;
  defaultGateway: string;
  hostDNS: string;
  hostPreDNS: string;
  hostAltDNS: string;
  port: string;
  atmSite: number;
}
