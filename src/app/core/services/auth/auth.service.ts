import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environments';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data: any;
  private readonly router = inject(Router);

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // إضافة PLATFORM_ID
  ) { }

  sendRegister(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  sendlogin(data: object): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  getUserData(): void {
    // التحقق من أن الكود يعمل في بيئة المتصفح
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token !== null) {
        this.data = jwtDecode(token);
        console.log(this.data);
      }
    }
  }

  logout(): void {
    // التحقق من أن الكود يعمل في بيئة المتصفح
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token') !== null) {
        localStorage.removeItem('token');
      }
    }
    this.data = null;
    this.router.navigate(['/login']);
  }
}