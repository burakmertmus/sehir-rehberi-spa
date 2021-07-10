import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
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
    private activatedRoute:ActivatedRoute) { }
    
    photos:Photo[]=[];
    uploader=this.fileUploader;
    hasBaseDropZoneOver=false;
    baseUrl="http://burakmertmus-001-site1.itempurl.com/";
    currentMain?:Photo;
    currentCity:any;
    
  ngOnInit() {
    
    this.activatedRoute.params.subscribe(params=>{
      this.currentCity = params["cityId"];
    })
   this.initializeUploader();
  }
  
  initializeUploader(){
    
    this.uploader=new FileUploader({
      
      url:this.baseUrl+'cities/photos/?cityId='+this.currentCity,
      authToken:'Bearer' +localStorage.getItem('token'),
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
          describtion:res.description,
          isMain:res.isMain,
          cityId:res.cityId
        }
        this.photos.push(photo);
      }
    }

  }
}
