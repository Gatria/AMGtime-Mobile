import {Component,Input, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subtimecard',
  templateUrl: './subtimecard.component.html',
  styleUrls: ['../timecard.component.css']
})
export class SubtimecardComponent implements OnInit {
@Input() item
displayedColumns: string[]=["Date","Hours","Reg","OTs","Unpaid","Amount"]; 
  constructor() { }

 
  ngOnInit() {
console.log(this.item)
  }
  
getRow(b) {
if (b!='') return 2; else return 1;
}

}