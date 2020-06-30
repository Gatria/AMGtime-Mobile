import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service';

@Component({
  selector: 'app-openshift',
  templateUrl: './openshift.component.html',
  styleUrls: ['./openshift.component.css']
})
export class OpenshiftComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
  }

}