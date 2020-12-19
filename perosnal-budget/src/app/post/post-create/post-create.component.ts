import { Component, OnInit } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Component({
  selector: 'pb-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {


  constructor(private http : HttpClient) { }
 
  enteredId= '';
  enteredName = '';
  enteredColor = '';
  enteredBudget= '';


  addBudget(){
    let url = "Http://localhost:3000/addbudget"
    this.http.post<any>(url, {
      id: this.enteredId,
      name: this.enteredName,
      budget: this.enteredBudget,
      color: this.enteredColor
    }).toPromise().then( (data:any) => {
      console.log(data)
      console.log(JSON.stringify(data.json))
    })
  }

  //---------------------
  //NgOnInIt
  //---------------------
  ngOnInit(): void {
  }

}
