import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  constructor(
    public dialog: MatDialog,
    private _appService: AppService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  onClickSearchBtn(): void {
    if (!this.range.value['start'] || !this.range.value['end']) {
      this.showErrorMessage('Invalid date selection!');
      return;
    }
    let startDate = this.range.value['start'].toLocaleDateString('en-CA');
    let endDate = this.range.value['end'].toLocaleDateString('en-CA');

    this._router.navigate(['/analytics'], {
      queryParams: { startDate: startDate, endDate: endDate },
    });
  }

  onClickCheckPreviousTrends(): void {
    this._appService.getAllData().subscribe((response) => {
      if (response) {
        this._router.navigate(['/analytics']);
      } else {
        this.showErrorMessage('Something went wrong. Please try again later!');
      }
    });
  }

  showErrorMessage(errMsg) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        message: errMsg,
      },
    });
  }
}
