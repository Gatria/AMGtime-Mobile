import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
@Component({
  selector: 'app-usigned',
  templateUrl: './usigned.component.html',
  styleUrls: ['./usigned.component.css']
})
export class USignedComponent implements OnInit  {
Document=[];
  constructor(private bksvc:BackendService) { }
  ngOnInit() {
    
this.bksvc.sendcommand((f)=>{this.Document=f;


},"*GetDocuments")  
  }

}