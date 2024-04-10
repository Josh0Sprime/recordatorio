import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environments } from '../../environments/environments.local';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = signal<{ user: string, id: number } | null>(null);
  private url: string = `${environments.baseUrl}/user`

  constructor(private http: HttpClient) { }

  get getUser() {
    return this.user();
  }

  set setUser(user: {user: string, id: number}) {
    this.user.set(user);
  }

  logIn(user: string, password: string): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(this.url, { params: { user, password } })
    .pipe(
      tap(resp => {
        if(resp.ok) {
          localStorage.setItem("token", resp.token!);
        }
      })
    )
  }

  
}
