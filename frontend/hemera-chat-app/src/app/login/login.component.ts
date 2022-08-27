import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import {Router} from "@angular/router";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  isLoginValid = false;
  isLoading = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(
    private authService: AuthService,
    private router: Router, 
    private storageService: StorageService
    ) { }
  
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(form : any): void {
    this.authService.login(form.value.username, form.value.password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.isLoading = true;
        localStorage.setItem('username', form.value.username);               
        this.router.navigate(['/chat']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;        
      }
    });
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
      
}