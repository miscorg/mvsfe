import { LHOPeopleData } from "src/app/model/lhopeople-data";
import { Module } from "src/app/model/module";
import { LHO } from "src/app/model/lho";

export class Network 
{
    networkId: string;
    networkName: string;

    lho: LHO;
    modules: Module[];
    lhoPeopleData: LHOPeopleData;
}
