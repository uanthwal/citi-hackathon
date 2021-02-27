import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "../app.service";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router, private _appService: AppService) {}

  ngOnInit(): void {
    sessionStorage.clear();
  }

  onClickLiveStream() {
    let passwordPromt = prompt("Please enter password here!!", "");
    if (null != passwordPromt) {
      let payload = {
        password: passwordPromt,
      };
      this._appService
        .validatePasswordForLiveStream(payload)
        .subscribe((response) => {
          if (response && response.code == 200) {
            sessionStorage.setItem("wasPassEntered", JSON.stringify(true));
            this._router.navigate(["/analytics"], {
              queryParams: { load_type: "live" },
            });
          } else {
            alert("Invalid Password!! Please try with a valid password.");
          }
        });
    }
  }

  onClickCheckPreviousTrends(): void {
    this._router.navigate(["/analytics"], {
      queryParams: { load_type: "prev_trends" },
    });
  }
}
