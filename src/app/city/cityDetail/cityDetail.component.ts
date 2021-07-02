import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router"
import { City } from '../../models/city';
import { CityService } from '../../services/city.service';

import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-cityDetail',
  templateUrl: './cityDetail.component.html',
  styleUrls: ['./cityDetail.component.css'],
  providers: [CityService]
})
export class CityDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private cityService: CityService) { }
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

  getCityById(cityId: any) {
    this.cityService.getCityById(cityId).subscribe(data => {
      this.city = data;
      this.getPhotosByCity(cityId)
    });
  }

  getPhotosByCity(cityId:any){
    this.cityService.getPhotosByCity(cityId).subscribe(data=>{
      this.photos=data;
      this.setGallery();
    });
  }

  getImages(){
    const imageUrls=[]
    
    if(this.city.photos != undefined){

      console.log("City:"+this.city);
     
    }else{
      console.log("çalışmadı");
    }
    if(this.photos != undefined){
      
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
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
 
    this.galleryImages = this.getImages();
 
  }
}