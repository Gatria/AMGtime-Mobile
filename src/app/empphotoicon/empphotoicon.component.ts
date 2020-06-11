import { Component, OnInit, Input } from '@angular/core';
import {BackendService} from '../backend.service';



@Component({
  selector: 'app-empphotoicon',
  templateUrl: './empphotoicon.component.html',
  styleUrls: ['./empphotoicon.component.css']
})
export class EmpphotoiconComponent implements OnInit {
@Input() name: string;
@Input() EmpID: string;
  constructor(private bksvc:BackendService) { }




  ngOnInit() {
 //if (this.bksvc.empimage[this.EmpID]==undefined) this.bksvc.getEmpPhoto(this.EmpID)
this.Initials=this.name.split(" ").map((n)=>n[0]).join("").substring(0,2);
}
  }

