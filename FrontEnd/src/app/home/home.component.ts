import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ErrorDialogComponent } from "../error-dialog/error-dialog.component";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog, private _router: Router) {}

  ngOnInit(): void {}

  onClickLiveStream() {
    this._router.navigate(["/analytics"], {
      queryParams: { load_type: "live" },
    });
  }

  onClickCheckPreviousTrends(): void {
    this._router.navigate(["/analytics"], {
      queryParams: { load_type: "prev_trends" },
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
