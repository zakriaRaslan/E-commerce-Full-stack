import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel, RegisterModel, User } from '../models/model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl:string="https://localhost:7197/api/Auth/"
  constructor(private http:HttpClient,private jwt:JwtHelperService) { }

//To Use JwtHelperService => npm instal @auth0/angular-jwt
  Register(user:RegisterModel){
    let url = `${this.baseUrl}register`
    return this.http.post(url,user);
  }
  login(user:LoginModel){
    let url = `${this.baseUrl}login`;
    return this.http.post(url,user);
  }
  saveToken(token:string){
    localStorage.setItem('token',token);
  }
  IsLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token');
  }
  GetUser(){
    let token = this.jwt.decodeToken()
    let user:User={
      userId:token.uId,
      firstName:token.name,
      lastName:token.family_name,
      userName:token.sub,
      email:token.email,
      address:token.Address,
      mobile:token.Mobile,
      password:""
    }
    return user
    }
  }

