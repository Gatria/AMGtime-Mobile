import {Component,Input, OnInit,Output, EventEmitter } from '@angular/core';
import {BackendService} from '../backend.service'

@Component({
  selector: 'app-chooseemployee',
  templateUrl: './chooseemployee.component.html',
  styleUrls: ['./chooseemployee.component.css']
})
export class ChooseemployeeComponent implements OnInit {
 @Input() ngModel
 @Input() filter:Function
 @Input() rightside="Id"
 @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
    console.log(this.bksvc.employeelist);
  }
chooseme(i) {
  this.ngModel=i
  this.ngModelChange.emit(i)

  console.log(i)
}
filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}
}