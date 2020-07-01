import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import { ChooseemployeeComponent } from '../chooseemployee/chooseemployee.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
styleUrls: ['../statusboard/statusboard.component.scss']
})
export class HomescreenComponent implements OnInit {
Sections=["Today's","Employee Current Statuses","New"];


  constructor(private bksvc:BackendService) { }
 colorScheme={domain:['#0f7da2','#C7B42C','#c62828','#AAAAAA','#008266']}
  ngOnInit() { 
    if (!this.bksvc.AMGSettings.IsEmployee)  this.GetSummaryInfo()

  }
GetSummaryInfo() {


this.bksvc.sendcommand((f)=>{this.bksvc.SummeryInfo=f;
this.colorScheme.domain=[];
this.single=[]
if (this.work>0) {this.colorScheme.domain.push('#0f7da2'); this.single.push({"name": this.bksvc.SummeryInfo[2].Name,"value": this.bksvc.SummeryInfo[2].Count});}
if (this.out>0) {this.colorScheme.domain.push('#049275'); this.single.push({"name": this.bksvc.SummeryInfo[3].Name,"value": this.bksvc.SummeryInfo[3].Count});}
if (this.abs>0) {this.colorScheme.domain.push('#c62828'); this.single.push({"name": this.bksvc.SummeryInfo[4].Name,"value": this.bksvc.SummeryInfo[4].Count});}

},"GetSummaryInfo",{time:new Date().f1()})  

  

}



  openDialog(): void {
    const dialogRef = this.bksvc.dialog.open("eeee", {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });
   
}

}

