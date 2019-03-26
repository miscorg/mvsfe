import { Network } from "src/app/model/network";
import { Region } from "src/app/model/region";

export class Module 
{
    moduleId: string;
    moduleName: string;

    network: Network;
    regions: Region[];
}
