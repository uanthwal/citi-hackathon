import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  message: 'Error Message';
}
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent implements OnInit {
  mainData: DialogData;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.mainData = data;
  }

  ngOnInit(): void {}
}
