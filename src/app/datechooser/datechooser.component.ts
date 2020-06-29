import { Component,Input, OnInit } from '@angular/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'ddd, DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LLLL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-datechooser',
  templateUrl: './datechooser.component.html',
  styleUrls: ['./datechooser.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DatechooserComponent  implements OnInit  {
 @Input() thdate:string; 
  @Input() datemode:BigInteger;
  @Input() myfunction:function;
change(a=0) {
const step1=[1,7,30]  
a=a*step1[this.datemode];
console.log(this.datemode)
var tomorrow = new Date(this.mydate);
    tomorrow.setDate(tomorrow.getDate() + a);
    this.mydate = tomorrow;
   if (typeof this.myfunction=="function") this.myfunction(this.mydate)
}
    constructor() { }
  ngOnInit()  {
    this.mydate=new Date(this.thdate)
    console.log(this.mydate) 
    console.log(this.thdate)   }
}