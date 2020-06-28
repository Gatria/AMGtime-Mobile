import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
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
  selector: 'app-punchanalysis',
  templateUrl: './punchanalysis.component.html',
  styleUrls: ['./punchanalysis.component.scss'],
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
export class PunchanalysisComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
      this.filter=31;
      this.mydate=new Date();
      this.godate(0);

  }

godate(a)
{
  delete(this.bksvc.PunchAnalysis);
   var tomorrow = new Date();
    tomorrow.setDate(this.mydate.getDate() + a);
    this.mydate = tomorrow;

    let tt=this.bksvc.encript("true");
this.bksvc.sendcommand((f)=>{this.bksvc.PunchAnalysis=f;},"GetPunchAnalyzis","&rounding="+tt+"&date="+this.bksvc.datetime(this.mydate) )

}

filterme(a,i) {
  //console.log(a,i);
  return a.toLowerCase().includes(i.toLowerCase());
}

chips(a) {
this.filter= this.filter ^ a; }


}