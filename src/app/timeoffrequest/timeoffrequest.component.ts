import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-timeoffrequest',
  templateUrl: './timeoffrequest.component.html',
  styleUrls: ['./timeoffrequest.component.css']
})
export class TimeoffrequestComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {

  }

}