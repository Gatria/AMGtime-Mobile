import { EventEmitter ,Component, OnInit,ViewChild , forwardRef } from '@angular/core';
import {BackendService} from '../backend.service'
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent,ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';

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
this.bksvc.currentDocument.DocId=a;
this.bksvc.currentDocument.RawSign=f.Sign;
this.bksvc.currentDocument.Sign=this.domSanitizer.bypassSecurityTrustUrl("data:image/png;base64, "+f.Sign)
console.log(this.bksvc.currentDocument.RawSign.length)


 f.Pages.forEach ((d,i)=> {    
 
  this.bksvc.sendcommand((f)=>{this.Image[i]=this.domSanitizer.bypassSecurityTrustUrl("data:image/png;base64, "+f.image);

this.scrollto(1);
  },"*GetDocumentImage","imageName="+d.FileName+"&docId="+a)
  
   }) 
   
   
   
    },"*GetDocument","docId="+a)

}
sign() {
       const dialogRef = this.dialog.open(SignitureComponent, {
            height: 'auto',
            width: '90vw'
          });
          dialogRef.afterClosed().subscribe(dialogResult => {
  if (dialogResult)   {
    this.bksvc.sendcommand((f)=>{
  delete(this.Document);
  this.bksvc.sendcommand((f)=>{this.Document=f;},"*GetDocuments"); 
this.scrollto(0);  
   },"*Sign","docId="+this.bksvc.currentDocument.DocId+"&signature="+this.bksvc.currentDocument.RawSign)
  }       
            });
}

cancel() {
      const dialogData = 
    new ConfirmDialogModel("Confirm Action","Are you sure you want to cancel document ?",true);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });


 dialogRef.afterClosed().subscribe(dialogResult => {
if (dialogResult | typeof dialogResult=="string") { 
this.bksvc.sendcommand((f)=>{
  delete(this.Document);
  this.bksvc.sendcommand((f)=>{this.Document=f;},"*GetDocuments"); 
this.scrollto(0);  
   },"*Cancel","docId="+this.bksvc.currentDocument.DocId+"&comment="+dialogResult)


   }
    }); 
}


decline() {
       const dialogData = 
    new ConfirmDialogModel("Confirm Action","Are you sure you want to decline signing ?",true);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

 dialogRef.afterClosed().subscribe(dialogResult => {
  if (dialogResult | typeof dialogResult=="string") { 
this.bksvc.sendcommand((f)=>{ 
delete(this.Document);
  this.bksvc.sendcommand((f)=>{this.Document=f;},"*GetDocuments"); 
this.scrollto(0);

},"*Decline","docId="+this.bksvc.currentDocument.DocId+"&comment="+dialogResult)


   }
    }); 
}

chips(a) {
  this.Image=[];
this.filter= this.filter ^ a;  
}
}







@Component({
  styleUrls: ['./usigned.component.css'],
  template: '<h2>Signiture Pad</h2><img *ngIf="sign==0" class="sm-round-corners sigimg" (click)="this.sign=1" [src]="this.bksvc.currentDocument.Sign"><ng-signature-pad  id="sig" (done)=getSig($event) *ngIf="sign==1" showDoneButton showClearButton backgroundColor="#fff" penColor="#005e82" format="base64"></ng-signature-pad><div class=" sigbody"><button class="round-corners" mat-flat-button (click)="onSign()" color="primary">OK</button><button class="round-corners" mat-stroked-button (click)="onDismiss()">Cancel</button></div>'

})
export class SignitureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,private bksvc:BackendService) { }

 onDismiss() {this.dialogRef.close(false)}
 getSig(e) {
  console.log(e)
 }
onSign() {

      document.querySelector('.btn').dispatchEvent (new Event('click'));
  //this.dialogRef.close(true)
  }
  ngOnInit() {
    this.sign=0
  }
}
