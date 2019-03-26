import { Module } from "src/app/model/module";
import { RegionPeopleData } from "src/app/model/region-people-data";

export class Region 
{
    regionId: string;
    regionName: string;

    module: Module;
    regionPeopleData: RegionPeopleData;
}
