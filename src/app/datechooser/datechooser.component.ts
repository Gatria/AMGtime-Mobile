import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-datechooser',
  templateUrl: './datechooser.component.html',
  styleUrls: ['./datechooser.component.css']
})
export class DatechooserComponent  {
 @Input()
    mydate: string;

    constructor() {
       
    }
}