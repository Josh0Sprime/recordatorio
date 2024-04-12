import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { JwtValidate, LoginResponse, RegisterUserResponse } from '../interfaces/login';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = signal<{ user: string, userId: number } | null>(null);
  private url: string = `${environment.baseUrl}/user`
  private urlToken: string = `${environment.baseUrl}/token`;

  constructor(private http: HttpClient, private router: Router) { }

  get getUser() {
    return this.user();
  }

  set setUser(user: {user: string, userId: number}) {
    this.user.set(user);
  }

  logIn(user: string, password: string): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(this.url, { params: { user, password } })
    .pipe(
      tap(resp => {
        if(resp.ok) {
          this.setUser = resp;
          localStorage.setItem("token", resp.token!);
        }
      })
    )
  }

  registerUser(user: { user: string, password: string, email: string }): Observable<RegisterUserResponse> {
    
    return this.http.post<RegisterUserResponse>(this.url, user);
  }

  validateToken(): Promise<boolean> {
    const token: string = localStorage.getItem("token")!;

    return new Promise((resolve, reject) => {
      this.http.get<JwtValidate>(`${this.urlToken}/validar`, { params: { token }})
      .pipe(
        tap(val => this.setUser = val.data!),
        map(resp => resp.ok)
      ).subscribe(resolve);
    })
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl("login");
  }

  
}
