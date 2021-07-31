import { Component, NgModule, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from "@angular/forms"
import { City } from 'src/app/models/city';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-cityAdd',
  templateUrl: './cityAdd.component.html',
  styleUrls: ['./cityAdd.component.css'],
  providers:[CityService,DatePipe]
})


export class CityAddComponent implements OnInit {
  constructor(
    private cityService:CityService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    public datepipe: DatePipe
    
    ) { }

    city!:City
    cityAddForm!:FormGroup;
    date=new Date();
  ngOnInit() {
    this.createCityForm();
  }

  createCityForm(){
    this.cityAddForm =this.formBuilder.group({
      name:["",Validators.required],
      description:["",Validators.required],
    })
  }

   

  private getNowUTC() {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }

  add(){
    
    
    let latest_date = this.datepipe.transform(this.date, 'short');
    if (this.cityAddForm !=undefined) {
      
      this.city=Object.assign({},this.cityAddForm.value)
      //Todo
      this.city.userId=this.authService.getCurrentUserId();
      this.city.dateAdded = latest_date;
      this.cityService.add(this.city);
    }

  }
}
