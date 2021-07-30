import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from '../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  public fileUploader!:FileUploader
  constructor(
    private authService:AuthService,
    private activatedRoute:ActivatedRoute,private router:Router) { }
    
    photos:Photo[]=[];
    uploader=this.fileUploader;
    hasBaseDropZoneOver=false;
    baseUrl="https://localhost:44300/";
    currentMain?:Photo;
    currentCity:any;
    
  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params=>{
      this.currentCity = params["cityId"];
    })
   this.initializeUploader();
  }
  
  initializeUploader(){
    
    //'Bearer'
    this.uploader=new FileUploader({
      url:this.baseUrl+'cities/photos/?cityId='+this.currentCity,
      authToken:'Bearer '+localStorage.getItem('token'),
      isHTML5:true,
      allowedFileType:['image'],
      autoUpload:false,
      removeAfterUpload:true,
      maxFileSize:10*1024*1024
    });
    

    this.uploader.onSuccessItem = (item,response,status,headers) =>{
      if (response) {
        const res:Photo=JSON.parse(response) ;
        const photo={
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          describtion:"res.description",
          isMain:res.isMain,
          cityId:res.cityId
        }
        this.photos.push(photo);
      }
    }
    
  }
}
