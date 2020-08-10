import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  title: string;
  message: string;
  comment: boolean;
  mycomment: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    // Update view with given values
    this.title = data.title;
    this.message = data.message;
    this.comment = data.comment;
    this.data.MaxWidth = '400px';
  }
  ngOnInit() {}
  onConfirm(): void {
    if (this.comment) this.dialogRef.close(this.mycomment);
    else this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

export class ConfirmDialogModel {
  MaxWidth: string;
  constructor(
    public title: string,
    public message: string,
    public comment: boolean = false
  ) {}
}
