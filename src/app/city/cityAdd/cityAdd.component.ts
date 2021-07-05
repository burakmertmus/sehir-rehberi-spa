import { Component, NgModule, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from "@angular/forms"
import { City } from 'src/app/models/city';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-cityAdd',
  templateUrl: './cityAdd.component.html',
  styleUrls: ['./cityAdd.component.css'],
  providers:[CityService]
})


export class CityAddComponent implements OnInit {

  constructor(
    private cityService:CityService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router
    
    ) { }

    city!:City
    cityAddForm!:FormGroup;
  ngOnInit() {
    this.createCityForm();
    console.log(this.authService.getCurrentUserId());
  }

  createCityForm(){
    this.cityAddForm =this.formBuilder.group({
      name:["",Validators.required],
      description:["",Validators.required],
    })
  }

  add(){
    if (this.cityAddForm !=undefined) {
      this.city=Object.assign({},this.cityAddForm.value)
      //Todo
      this.city.userId=this.authService.getCurrentUserId();
      this.cityService.add(this.city);
      
    }

  }
}
