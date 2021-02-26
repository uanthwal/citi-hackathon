import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router) {}

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
}
