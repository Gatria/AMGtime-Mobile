import {Component,Input, OnInit,Output, EventEmitter } from '@angular/core';
import {BackendService} from '../../backend.service'

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
["Date","Shift","Job|Department"],
["Date","Time","Action","Type"],
["Date","Time","Action"],
["Code","Name","Taken","Pending","Left"],
]; 
  constructor(private bksvc:BackendService) { }

 
  ngOnInit() { }
ck(a) {
 return (a!=undefined && a!='' && a!=null) 
}
getRow(b) {
if (this.ck(b)) return 2; else return 1;
}

}