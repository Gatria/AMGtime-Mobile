import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 

@Component({
  selector: 'app-punchdialog',
  templateUrl: './punchdialog.component.html',
  styleUrls: ['./punchdialog.component.scss']
})
export class PunchdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}