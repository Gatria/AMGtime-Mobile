import { Component} from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
 styleUrls: ['../login/login.component.css']
})
export class PasswordresetComponent {

  constructor(private bksvc:BackendService) { }


validate() {
    this.bksvc.sendcommand((f)=>{  },"ResetPassword",{email:this.bksvc.name,password:this.bksvc.password,securityCode:this.validation})
  }
}
