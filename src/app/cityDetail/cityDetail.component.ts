import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { City } from '../models/city';
import { CityService } from '../services/city.service';
@Component({
  selector: 'app-cityDetail',
  templateUrl: './cityDetail.component.html',
  styleUrls: ['./cityDetail.component.css'],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cityService: CityService) { }
  city!: City;
  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.getCityById(params["cityId"]);
    });

  }

  getCityById(cityId: any) {
    this.cityService.getCityById(cityId).subscribe(data=>{
      this.city=data;
    });
  }

}