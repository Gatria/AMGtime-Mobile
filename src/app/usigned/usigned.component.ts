import { Component, OnInit } from '@angular/core';
import {BackendService} from '../backend.service'
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-usigned',
  templateUrl: './usigned.component.html',
  styleUrls: ['./usigned.component.css']
})
export class USignedComponent implements OnInit  {
Document=[];
  constructor(private bksvc:BackendService,private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    
this.bksvc.sendcommand((f)=>{this.Document=f;},"*GetDocuments")  
  }


getdocument(a) {
  this.bksvc.sendcommand((f)=>{this.Image=this.domSanitizer.bypassSecurityTrustUrl("data:image/png;base64, "+f.image);},"*GetDocumentImage","imageName=file_1.png&docId="+a)  
console.log(a)
}

}