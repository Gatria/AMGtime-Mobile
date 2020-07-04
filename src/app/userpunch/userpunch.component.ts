import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-userpunch',
  templateUrl: './userpunch.component.html',
  styleUrls: ['./userpunch.component.css']
})
export class UserpunchComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
  }

}