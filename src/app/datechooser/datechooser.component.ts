import { Component,Input, OnInit,Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-datechooser',
  templateUrl: './datechooser.component.html',
  styleUrls: ['./datechooser.component.css']
})
export class DatechooserComponent  implements OnInit  {
 @Input() thdate:string; 
 @Input() datemode=0;
 @Input() buttons=[];
 @Input() futureonly=0;

 @Output() thdateChange: EventEmitter<any> = new EventEmitter();
@Output() datemodeChange: EventEmitter<any> = new EventEmitter();

topbuttonclick(a){
  this.datemode=a;
  this.datemodeChange.emit(this.datemode)
  this.change()  
} 

change(a=0) {
const step1=[1,7,30]  
a=a*step1[this.datemode];

var tomorrow = new Date(this.mydate);
    tomorrow.setDate(tomorrow.getDate() + a);
    this.mydate = tomorrow;
    this.thdateChange.emit(this.mydate);
}
    constructor() { }
  ngOnInit()  {
    this.mydate=new Date(this.thdate)
    console.log(this.mydate) 
    console.log(this.thdate)   }
}