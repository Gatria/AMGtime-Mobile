import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(public bksvc: BackendService) {}
  ngOnInit() {}
  check() {
    if (this.bksvc.ShowLogs) console.log(this.bksvc.mystorage);
    this.bksvc.sendcommand((f) => {
      this.bksvc.SaveVal('URL', this.bksvc.url);
      this.bksvc.showinfo(this.bksvc.tm.s3);
    }, 'CheckService');
  }
}
