import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-chooseemployee',
  templateUrl: './chooseemployee.component.html',
  styleUrls: ['./chooseemployee.component.css']
})
export class ChooseemployeeComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
    console.log(this.bksvc.employeelist);
  }
chooseme(i) {
  console.log(i)
}
}