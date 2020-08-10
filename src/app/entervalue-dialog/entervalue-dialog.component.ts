import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-entervalue-dialog',
  templateUrl: './entervalue-dialog.component.html',
  styleUrls: ['./entervalue-dialog.component.css']
})
export class EnterValueDialogComponent implements OnInit {
  title: string;
  message: string;
  myvalue:string="";


  constructor(public dialogRef: MatDialogRef<EnterValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EnterValueDialogModel) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;

    this.data.MaxWidth="400px"
  }
 ngOnInit() {}
  onConfirm(): void {
    // Close the dialog, return true
this.dialogRef.close(this.myvalue)
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
export class EnterValueDialogModel {
  MaxWidth:string;
  constructor(public title: string, public message: string, public comment:boolean=false) {
  }
}
