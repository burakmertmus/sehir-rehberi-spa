import { DatePipe } from "@angular/common";
import {Photo} from "./photo"



export class City{
     id?:number;
    name?:string;
    description?:string;
    userId?:number;
    userName?:string;
    photos!:Photo[];
    dateAdded:string | undefined |null;
    url?:string;
    
    
}