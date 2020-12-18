import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = "http://localhost:3000/api/signup"
  private loginUrl = "http://localhost:3000/api/signup"

  constructor(private http: HttpClient) { }
  SignUpUser(user) {
    return this.http.post<any>(this.signUpUrl, user)
  }

  loginUser(user){
    return this.http.post<any>(this.loginUrl, user)
  }

}
