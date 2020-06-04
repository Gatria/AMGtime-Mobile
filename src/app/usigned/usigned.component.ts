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
filter=63;
  constructor(private bksvc:BackendService,private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    
this.bksvc.sendcommand((f)=>{this.Document=f;},"*GetDocuments")  
  }


getdocument(a) {
  
this.Image=[];
  this.bksvc.sendcommand(
    (f)=>{

 f.Pages.forEach ((d,i)=> {    
 
  this.bksvc.sendcommand((f)=>{this.Image[i]=this.domSanitizer.bypassSecurityTrustUrl("data:image/png;base64, "+f.image);

 setTimeout(()=>{document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth+5},100);
  },"*GetDocumentImage","imageName="+d.FileName+"&docId="+a)
  
   }) 
   
   
   
    },"*GetDocument","docId="+a)

}


chips(a) {
this.filter= this.filter ^ a;  
}
}