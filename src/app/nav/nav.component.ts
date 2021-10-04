import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService:AuthService) { }
  loginUser:any={};
  currentUser:string="";
  navbarCollapse:boolean=false;
  ngOnInit() {
  }
  
  togglenavbar(){
    return !this.navbarCollapse;
  }

  login(){
    this.authService.login(this.loginUser)
    
  }
  
  logOut(){
    this.currentUser="";
    this.authService.logOut()
  }
  getUserName(){
    this.currentUser=this.authService.getCurrentUserName()
  }
  get isAuthenticated(){
    this.getUserName();
    return this.authService.loggedIn();
  }
}
