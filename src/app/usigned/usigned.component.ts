import { Component, OnInit,ViewChild , forwardRef } from '@angular/core';
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
first=true;

  constructor(private bksvc:BackendService,private domSanitizer: DomSanitizer) { }
  ngOnInit() {
    
this.bksvc.sendcommand((f)=>{this.Document1=f;},"*GetDocuments")  
  }

scrollto(a)
{
setTimeout(()=>{document.querySelector("mat-sidenav-content").scrollTop=0;document.getElementById("slider").scrollLeft=document.getElementById("slider").parentElement.clientWidth*a},100);  
}

scroll() {
 this.first= document.getElementById("slider").scrollLeft==0;
}
getdocument(a) {
  
this.Image=[];
  this.bksvc.sendcommand(
    (f)=>{

 f.Pages.forEach ((d,i)=> {    
 
  this.bksvc.sendcommand((f)=>{this.Image[i]=this.domSanitizer.bypassSecurityTrustUrl("data:image/png;base64, "+f.image);

this.scrollto(1);
  },"*GetDocumentImage","imageName="+d.FileName+"&docId="+a)
  
   }) 
   
   
   
    },"*GetDocument","docId="+a)

}


chips(a) {
  this.Image=[];
this.filter= this.filter ^ a;  
}
}


