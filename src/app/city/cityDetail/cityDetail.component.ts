import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { Photo } from '../../models/photo';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cityDetail',
  templateUrl: './cityDetail.component.html',
  styleUrls: ['./cityDetail.component.css'],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute
    ,private cityService: CityService
    ,private authService:AuthService) { }
  city!: City;
  photos: Photo[]=[];
  galleryOptions!: NgxGalleryOptions[];
  galleryImages?: NgxGalleryImage[];

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getCityById(params["cityId"]);
      this.getPhotosByCity(params["cityId"]);
    });
  }

   get currentUser(){
    if(this.authService.getCurrentUserId()!=undefined){
      if(this.authService.getCurrentUserId()==this.city.userId)
      {
      return true;
      }
      else{
        return false;
      }
    }else{
      return false;
    }
  }

  getCityById(cityId: any) {
    this.cityService.getCityById(cityId).subscribe(data => {
      this.city = data;
      this.getPhotosByCity(cityId)
    });
  }

  getPhotosByCity(cityId:any){
    this.cityService.getPhotosByCity(cityId).subscribe(data=>{
      this.photos=data;
      if (this.photos.length!=0) {
        this.setGallery()
      }

    });
  }

  getImages(){
    const imageUrls=[]
    
   
    if(typeof(this.photos)  != 'undefined'){
      
      for(let i =0;i<this.city.photos.length;i++){
        imageUrls.push({
          small:this.city.photos[i].url,
          medium:this.city.photos[i].url,
          big:this.city.photos[i].url,
        });
      }
    }
    
    return imageUrls;
    
  }

  setGallery() {

    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];
 
    this.galleryImages = this.getImages();
 
  }
}