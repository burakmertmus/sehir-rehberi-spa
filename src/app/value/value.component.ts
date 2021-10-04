import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Value } from '../models/Value';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  constructor(private http:HttpClient) { }
  values:Value[]=[];

  ngOnInit() {
    this.getValues().subscribe(data=>{
      this.values=data
    });
  }
  getValues(){
    return this.http.get<Value[]>("https://cityguidebookapi.herokuapp.com/values");
  }

}
