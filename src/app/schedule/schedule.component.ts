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
    this.mydate.setHours(0,0,0);
    this.godate() 
  }
stringtodate(a)
{
 return a.substr(0,4)+"-"+a.substr(4,2)+"-"+a.substr(6,2); 
}
godate(a=0)
{
 if (a!==0) this.mydate=a;
this.bksvc.sendcommand((f)=>{this.bksvc.AdvancedScheduling=f;},"GetAdvancedScheduling",{date:this.mydate.f1(),viewMode:this.viewmode}) 
}

}