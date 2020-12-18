import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  enteredName = '';
  enteredColor = '';
  enteredAmountValue= '';

  constructor(private http:HttpClient) { }

  //--------------------
  // addbudget post request
  //----------------------
  addBudget(){
    let url = "http://localhost:300/addbudget";

    this.http.post(url, {

    } )
  }

  //---------------------
  //NgOnInIt
  //---------------------
  ngOnInit(): void {
  }

}
