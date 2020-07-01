import { Component,  Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 

@Component({
  selector: 'app-punchdialog',
  templateUrl: './punchdialog.component.html',
  styleUrls: ['./punchdialog.component.scss']
})
export class PunchdialogComponent  {

  constructor(public dialogRef: MatDialogRef,
    @Inject(MAT_DIALOG_DATA) public data) { this.MAT_DIALOG_DATA.MaxWidth="200px"}

}