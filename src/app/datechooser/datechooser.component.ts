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
 @Input() futureonly=false;
 @Input() pastonly=false;
 step1=[1,7,30]
 @Output() thdateChange: EventEmitter<any> = new EventEmitter();
 @Output() datemodeChange: EventEmitter<any> = new EventEmitter();

topbuttonclick(a){
  this.datemode=a;
  this.datemodeChange.emit(this.datemode)
  this.change()  
} 

checkfuture()
{
 var d1 = new Date(this.mydate);
    d1.setDate(d1.getDate() - this.step1[this.datemode])
    d1.setHours(23,59,59);
return (d1<new Date() && this.futureonly)

}



checkpast()
{
 var d1 = new Date(this.mydate);
    d1.setDate(d1.getDate()+1)
    d1.setHours(0,0,0);
return (d1>new Date() && this.pastonly)

}

change(a=0) {
  
a=a*this.step1[this.datemode];

var tomorrow = new Date(this.mydate);
    tomorrow.setDate(tomorrow.getDate() + a);
    tomorrow.setHours(0,0,0,0)
    this.mydate = tomorrow;
    this.thdateChange.emit(this.mydate);
}
    constructor() { }
  ngOnInit()  {
    this.mydate=new Date(this.thdate)
   }
}