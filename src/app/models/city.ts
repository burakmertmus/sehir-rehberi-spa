import {Photo} from "./photo"
export class City{
    id?:number;
    name?:string;
    description?:string;
    userId?:number;
    userName?:string;
    photos!:Photo[];
    
    url?:string;
}