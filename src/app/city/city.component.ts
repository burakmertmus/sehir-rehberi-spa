import { Component, OnInit } from '@angular/core';
import { City } from '../models/city';
import { AuthService } from '../services/auth.service';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers:[CityService]
})
export class CityComponent implements OnInit {

  constructor(private cityService:CityService,private authService:AuthService) { }
  cities?:City[]
  
  ngOnInit() {
  
  this.cityService.getCities().subscribe(data=>{ 
    this.cities=data;
  });
  }

  get currentUserName(){
   return this.authService.getCurrentUserName()!=undefined?this.authService.getCurrentUserName():false;
  }
}
