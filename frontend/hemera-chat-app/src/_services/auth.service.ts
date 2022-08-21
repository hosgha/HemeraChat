import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../_models/login.model';
const AUTH_API = 'http://localhost:5199/api/v1/account/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginModel : Login = new Login();

  constructor(private http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    this.loginModel.Username = username;
    //this.loginModel.Email = email;
    this.loginModel.Password = password;
    
    return this.http.post(AUTH_API + 'login',this.loginModel,httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  registerAdmin(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register-admin',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }

}