import { Component, NgModule, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import {FormGroup,FormControl,Validator,FormBuilder, Validators} from "@angular/forms"
import { City } from 'src/app/models/city';



@Component({
  selector: 'app-cityAdd',
  templateUrl: './cityAdd.component.html',
  styleUrls: ['./cityAdd.component.css'],
  providers:[CityService]
})


export class CityAddComponent implements OnInit {

  constructor(private cityService:CityService,
    private formBuilder:FormBuilder) { }

    city!:City
    cityAddForm:FormGroup | undefined;
  ngOnInit() {
    this.createCityForm();
  }

  createCityForm(){
    this.cityAddForm =this.formBuilder.group({
      name:["",Validators.required],
      description:["",Validators.required],
    })
  }

  add(){
    console.log("add Çalıştı");
    if (this.cityAddForm !=undefined) {
      console.log("ekle");
      this.city=Object.assign({},this.cityAddForm.value)
      //Todo
      this.city.userId=1;
      this.cityService.add(this.city);
    }else{console.log("ekleme");}

  }
}
