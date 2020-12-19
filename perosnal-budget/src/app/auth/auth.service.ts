import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthData } from './auth-data.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = "http://localhost:3000/api/signup"
  private loginUrl = "http://localhost:3000/api/login"

  constructor(private http: HttpClient) { }

  private token : string ;
  
  getToken () {
    return this.token;
  }

  SignUpUser(user) {
    return this.http.post<any>(this.signUpUrl, user)
  }

  loginUser(email:string, password: string  ){
    const authData: AuthData = { email: email, password: password}
      this.http.post<{token: string}>(this.loginUrl, authData)
      .subscribe(response => {
        const token = response.token;
        this.token = token
      })
  }

}
