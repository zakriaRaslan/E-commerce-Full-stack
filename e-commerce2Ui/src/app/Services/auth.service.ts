import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel, ChangePasswordDto, LoginModel, RegisterModel, ResetPasswordDto, User, UserInfo } from '../models/model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://localhost:7197/api/Auth/';
  constructor(
    private http: HttpClient,
    private jwt: JwtHelperService,
    private cookieService: CookieService
  ) {}

  //To Use JwtHelperService => npm instal @auth0/angular-jwt
  Register(user: RegisterModel) {
    let url = `${this.baseUrl}register`;
    return this.http.post(url, user);
  }
  login(user: LoginModel) {
    let url = `${this.baseUrl}login`;
    return this.http.post(url, user);
  }
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
  saveRefreshToken(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken);
  }
  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
  getToken() {
    return localStorage.getItem('token');
  }

  IsLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  RenewToken(refreshToken: string) {
    let url = `${this.baseUrl}refresh-token`;
    return this.http.get<AuthModel>(url, {
      params: {
        refreshToken: refreshToken,
      },
    });
  }

  GetUser() {
    let token = this.jwt.decodeToken();
    let user: User = {
      userId: token.uId,
      firstName: token.name,
      lastName: token.family_name,
      userName: token.sub,
      email: token.email,
      address: token.Address,
      mobile: token.Mobile,
      role: token.role,
      password: '',
    };
    return user;
  }

  getUserById(userId:string|null){
    let url =`${this.baseUrl}get-user-by-id/${userId}`;
    return this.http.get<any>(url);
  }

  GetUsersList() {
    let url = `${this.baseUrl}get-users-list`;
    return this.http.get<any[]>(url);
  }

  ModifyUser(model:UserInfo){
    let url =`${this.baseUrl}modify-user`
    return this.http.patch(url,model);
  }

  ChangePassword(model:ChangePasswordDto){
    let url =`${this.baseUrl}change-password`;
    return this.http.patch(url,model);
  }

 SendResetPasswordLink(email:string){
  return this.http.post<any>(`${this.baseUrl}send-reset-password-email/${email}`,{});
 }

 ResetPassword(resetPasswordDto:ResetPasswordDto){
  return this.http.post<any>(`${this.baseUrl}reset-password`,resetPasswordDto);
 }
}
