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
ck(a) {
 return (a.Details!=undefined && a.Details!='') 
}
getRow(b) {
if (this.ck(b)) return 2; else return 1;
}

}