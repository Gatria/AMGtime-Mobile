import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'


@Component({
  selector: 'app-mat-sidenav',
  templateUrl: './mat-sidenav.component.html',
  styleUrls: ['./mat-sidenav.component.css']
})
export class MatSidenavComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
  }

}