import {Component,Input, OnInit,Output, EventEmitter } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-chooseemployee',
  templateUrl: './chooseemployee.component.html',
  styleUrls: ['./chooseemployee.component.css']
})
export class ChooseemployeeComponent implements OnInit {
 @Input() ngModel
 @Input() filter=(e)=>{return true}
 @Input() rightside="Id"
 @Output() ngModelChange: EventEmitter<any> = new EventEmitter();


  constructor(private bksvc:BackendService) { }

  ngOnInit() {
 
  }
chooseme(i) {
  this.ngModel=i
  this.ngModelChange.emit(i)
  console.log(i)
}
filterme(a,i) {
  //console.log(a,i);
  var d=a.Code+a.Name
  return this.filter(a) && d.toLowerCase().includes(i.toLowerCase());
}
}