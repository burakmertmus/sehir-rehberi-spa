import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }
  path: string = "http://localhost:44300/auth"

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append("Context-Type", "application/json");
    this.httpClient
    .post(this.path + "login", loginUser, { headers: headers })
    .subscribe(data => {
      this.saveToken(data['tokenString']);
    });
  }
  saveToken(token:string){
    localStorage.setItem('token',token);
  }
}
