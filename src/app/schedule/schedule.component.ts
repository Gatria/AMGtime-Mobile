import { Component, OnInit } from '@angular/core'
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private bksvc:BackendService) { }
viewmode=0
  ngOnInit() {
    this.mydate=new Date();
    this.chips(this.viewmode) 
  }

chips(b,a=0)
{this.viewmode=b
 var tomorrow = new Date();
    tomorrow.setDate(this.mydate.getDate() + a);
    this.mydate = tomorrow;
    console.log(this.mydate)
this.bksvc.sendcommand((f)=>{this.bksvc.AdvancedScheduling=f;},"GetAdvancedScheduling","date="+this.bksvc.datetime(this.mydate)+"&viewMode="+this.bksvc.encript(""+this.viewmode)) 
}

}