import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/LoginUser';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router:Router,
    private alertifyService:AlertifyService) { }

  path: string = "http://burakmertmus-001-site1.itempurl.com/auth/"
  userToken:any;
  decodedToken:any;

  jwtHelper= new JwtHelper();
  TOKEN_KEY="token";
    
    
  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Context-Type", "application/json");
    
     var respon=this.httpClient
    .post(this.path + "login", loginUser, { headers: headers })
    .subscribe(
      data => {
      //console.log(params);
        this.saveToken(data.toString());
       this.userToken=data;
       this.decodedToken=this.jwtHelper.decodeToken(data.toString());
       this.alertifyService.success("Sisteme başarıyla giriş yapıldı.");
    },error => this.alertifyService.error("Kullanıcı Adı veya Şifre Hatalı !")
    );
    
    

  }

  register(registerUser:RegisterUser){
    let headers = new HttpHeaders();
    headers = headers.append("Context-Type", "application/json");
    this.httpClient
    .post(this.path+"register",registerUser,{headers:headers})
    .subscribe(data=>{
      this.alertifyService.success("Sisteme başarıyla kayıt yapıldı.");
    },error=>this.alertifyService.error("Kayıt yapılamadı!"));
    
    
    this.router.navigateByUrl("/city");
  }

  saveToken(token:string){
    console.log(token);
    localStorage.setItem(this.TOKEN_KEY,token);
  }

  logOut(){
    localStorage.removeItem(this.TOKEN_KEY);
    this.alertifyService.error("Sistemden Çıkış yapıldı.");
  }

  loggedIn(){
    return tokenNotExpired(this.TOKEN_KEY);
  }
  get token(){
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getCurrentUserName(){
    if(this.token!=null){
      return this.jwtHelper.decodeToken(this.token).unique_name;
    }else {return;}
    
  }
  getCurrentUserId(){
    if(this.token!=null){
      // console.log(this.token);
      // console.log(this.jwtHelper.decodeToken(this.token).unique_name)

      return this.jwtHelper.decodeToken(this.token).nameid;
    }else {return;}
    
  }

}
