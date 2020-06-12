import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
 styleUrls: ['../login/login.component.css']
})
export class PasswordresetComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
    this.bksvc.sendcommand((f)=>{  },"ForgotPassword","email="+this.bksvc.encript(this.bksvc.name))
  }
validate() {
    this.bksvc.sendcommand((f)=>{  },"ResetPassword","email="+this.bksvc.encript(this.bksvc.name)+"&password="+this.bksvc.encript(this.bksvc.password)+"&securityCode="+this.bksvc.encript(this.bksvc.validation))
  }
}
