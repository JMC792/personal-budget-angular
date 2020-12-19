import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms"
import { HttpClient } from "@angular/common/http" 

@Component({
  selector: 'pb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  addedEmail = '';
  addedPassword = ''

  constructor(private http : HttpClient ) {}

  addUser(){
    let url = "Http://localhost:3000/signup"

    this.http.post<any>(url, {
      email: this.addedEmail,
      password: this.addedPassword      
    }).toPromise().then((data:any) => {
      console.log(data)
      console.log(JSON.stringify(data.json))
    })

  }


}
