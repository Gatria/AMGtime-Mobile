import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
styleUrls: ['../login/login.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
  }
  check() {
  this.bksvc.sendcommand((f)=>{ this.bksvc.showinfo("Service is Working")},"CheckService")  
  }

}