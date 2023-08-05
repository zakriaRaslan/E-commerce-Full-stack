import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl:string="https://localhost:7197/api/Auth/"
  constructor(private http:HttpClient) { }

  Register(user:User){
    let url = `${this.baseUrl}register`
    return this.http.post(url,user);
  }
}
