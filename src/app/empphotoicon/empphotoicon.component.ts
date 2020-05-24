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



stringToHslColor(str, s, l) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return {'color': 'hsl('+h+', '+30+'%, '+30+'%)','background-color': 'hsl('+h+', '+60+'%, '+85+'%)'};
}

  ngOnInit() {
 //if (this.bksvc.empimage[this.EmpID]==undefined) this.bksvc.getEmpPhoto(this.EmpID)
this.Initials=this.name.split(" ").map((n)=>n[0]).join("").substring(0,2);
}
  }

