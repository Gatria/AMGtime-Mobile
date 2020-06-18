import { Component, OnInit,ViewChild , forwardRef } from '@angular/core';
import {BackendService} from '../backend.service'
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-usigned',
  templateUrl: './usigned.component.html',
  styleUrls: ['./usigned.component.css']
})
export class USignedComponent implements OnInit  {
Document=[];
filter=63;
first=true;

  constructor(private bksvc:BackendService,private domSanitizer: DomSanitizer,public dialog: MatDialog) { }
  ngOnInit() {
    
this.bksvc.sendcommand((f)=>{this.Document=f;},"*GetDocuments")  
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
this.bksvc.currentDocument=f;
this.bksvc.currentDocument.Sign=this.domSanitizer.bypassSecurityTrustUrl("data:image/png;base64, "+f.Sign)
 f.Pages.forEach ((d,i)=> {    
 
  this.bksvc.sendcommand((f)=>{this.Image[i]=this.domSanitizer.bypassSecurityTrustUrl("data:image/png;base64, "+f.image);

this.scrollto(1);
  },"*GetDocumentImage","imageName="+d.FileName+"&docId="+a)
  
   }) 
   
   
   
    },"*GetDocument","docId="+a)

}
sign() {
       let dialogRef = this.dialog.open(SignitureComponent, {
            height: 'auto',
            width: '90vw',
          });
          dialogRef.afterClosed().subscribe(result => {
            
            });
}

cancel() {
  
}

chips(a) {
  this.Image=[];
this.filter= this.filter ^ a;  
}
}







@Component({
  styleUrls: ['./usigned.component.css'],
  template: '<h2>Signiture Pad</h2><img *ngIf="sign==0" class="sm-round-corners sigimg" (click)="this.sign=1" [src]="this.bksvc.currentDocument.Sign"><ng-signature-pad  *ngIf="sign==1" showDoneButton showClearButton backgroundColor="#fff" penColor="#005e82" format="base64"></ng-signature-pad><div class=" sigbody"><button class="round-corners" mat-flat-button color="primary">OK</button><button class="round-corners" mat-stroked-button >Cancel</button></div>'

})
export class SignitureComponent implements OnInit {

  constructor(private bksvc:BackendService) { }

  ngOnInit() {
    this.sign=0
  }
}
