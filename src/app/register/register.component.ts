import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder,
  Validators,
  FormGroup,
  FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private formBuilder:FormBuilder) { }
  
  registerForm?:FormGroup;
  registerUser:any={};

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      userName:["",Validators.required],
      password:["",[Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8)]],
      confirmPassword:["",Validators.required]
    },
    {validator:this.passwordMatchValidator}
    );
  }
  
  passwordMatchValidator(g:FormGroup){
    
      if (g.get('password')?.value === g.get('confirmPassword')?.value) {
        return null;
      }
      else{
        return {misMatch:true};
      }
    
  }

  register(){
    if(this.registerForm!=undefined){
      this.registerUser=Object.assign({},this.registerForm.value);
      this.authService.register(this.registerUser);
    }
  }



}
