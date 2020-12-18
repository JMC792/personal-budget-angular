import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pb-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  enteredValue= '';
  newPost= 'No Content';

  onAddPost(postInput: HTMLTextAreaElement) {
    this.newPost= this.enteredValue;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
