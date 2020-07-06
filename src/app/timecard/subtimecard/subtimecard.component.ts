import {Component,Input, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subtimecard',
  templateUrl: './subtimecard.component.html',
  styleUrls: ['../timecard.component.css']
})
export class SubtimecardComponent implements OnInit {
@Input() item
@Input() i
@Input() ttype=0
displayedColumns: string[]=[["Date","Hours","Reg","OTs","Unpaid","Amount"],
["Date","Hours","Reg","OTs","Unpaid","Amount"],
["Date","Time","Action","Type"],
["Date","Time","Action"]
]; 
  constructor() { }

 
  ngOnInit() { }
ck(a) {
 return (a!=undefined && a!='' && a!=null) 
}
getRow(b) {
if (this.ck(b)) return 2; else return 1;
}

}