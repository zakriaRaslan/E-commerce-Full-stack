import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserInfo } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
baseUrl:string = 'https://localhost:7197/api/Users/'
  constructor(private http:HttpClient) { }


getUserInfo(userId:string){
let url = `${this.baseUrl}userinfo/${userId}`
return this.http.get<UserInfo>(url);
}
}
