import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { Photo } from '../models/photo';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { mapTo } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient,
    private alertifyService:AlertifyService,
    private router:Router) { }
  path = "https://cityguidebookapi.herokuapp.com/"

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.path + "cities");
  }
  getCityById(cityId: any): Observable<City> {
    return this.httpClient.get<City>(this.path + "cities/detail/?id=" + cityId);
  }

  getPhotosByCity(cityId: any): Observable<Photo[]> {
    return this.httpClient.get<Photo[]>(this.path + "cities/cityPhotos/?cityId=" + cityId);
  }

  

  add(city:any){
    this.httpClient.post(this.path+'cities/add',city).subscribe(data=>{
      this.alertifyService.success("Şehir başarıyla eklendi");
      let l=<City>JSON.parse(JSON.stringify(data));
      this.router.navigateByUrl("/cityDetail/"+l.id);
    });
    
  }
}
