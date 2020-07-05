import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subtimecard',
  templateUrl: './subtimecard.component.html',
  styleUrls: ['../timecard.component.css']
})
export class SubtimecardComponent implements OnInit {
displayedColumns: string[]=["Date","Hours","Reg","OTs","Unpaid","Amount"]; 
  constructor() { }

  ngOnInit() {
  }

}