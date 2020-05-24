import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'


@Component({
  selector: 'app-homescreen',
  templateUrl: './homescreen.component.html',
  styleUrls: ['./homescreen.component.css']
})
export class HomescreenComponent implements OnInit {
Sections=["Today's","Employee Current Statuses","New"];


  constructor(private bksvc:BackendService) { }

  ngOnInit() { 
    if (!this.bksvc.AMGSettings.IsEmployee) this.GetSummaryInfo()

  }
GetSummaryInfo() {


this.bksvc.sendcommand((f)=>{this.bksvc.SummeryInfo=f;
console.log(this.bksvc.SummeryInfo);

},"GetSummaryInfo","&time="+this.bksvc.datetime())  

  

}



  openDialog(): void {
    const dialogRef = this.bksvc.dialog.open("eeee", {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });
   
}

}

