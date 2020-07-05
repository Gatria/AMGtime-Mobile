import {Component,Input, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subtimecard',
  templateUrl: './subtimecard.component.html',
  styleUrls: ['../timecard.component.css']
})
export class SubtimecardComponent implements OnInit {
@Input() item
@Input() i
displayedColumns: string[]=["Date","Hours","Reg","OTs","Unpaid","Amount"]; 
  constructor() { }

 
  ngOnInit() { }
check (a) {
 return (check.Details!=undefined && check.Details!='') 
}
getRow(b) {
if (b!='') return 2; else return 1;
}

}