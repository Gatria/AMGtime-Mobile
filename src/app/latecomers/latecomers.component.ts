import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-latecomers',
  templateUrl: './latecomers.component.html',
  styleUrls: ['./latecomers.component.css']
})
export class LatecomersComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
  }

}