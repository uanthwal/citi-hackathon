import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../app.service";
import { v4 as uuidv4 } from "uuid";
import { ChartOptions, ChartType } from "chart.js";
import { Color } from "ng2-charts";

@Component({
  selector: "app-analytics",
  templateUrl: "./analytics.component.html",
  styleUrls: ["./analytics.component.scss"],
})
export class AnalyticsComponent implements OnInit {
  tilesData = [];
  uniqueId: string;
  showLoader: boolean = false;
  barChartData = [];
  barChartLabels = [];
  barChartDataWF = [];
  barChartLabelsWF = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartType: ChartType = "bar";
  barChartLegend = true;
  barChartPlugins: any = {
    backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
  };
  barChartColors: Color[] = [{ backgroundColor: "white" }];
  isLiveStreamOn = false;
  poller;
  previousResponse;
  constructor(private _route: ActivatedRoute, private _appService: AppService) {
    this._route.queryParamMap.subscribe((params) => {
      let paramObject = { ...params.keys, ...params };
      if (paramObject["params"]["load_type"] == "live") {
        this.uniqueId = uuidv4();
        this.startLiveStream(this.uniqueId);
        this.startPoller();
      } else {
        this.uniqueId = "historical";
        this.getPreviousTrends();
      }
    });
  }

  ngOnInit(): void {}

  onClickStopStreaming() {
    this.isLiveStreamOn = false;
    clearInterval(this.poller);
  }

  startPoller() {
    this.poller = setInterval((_) => {
      this.isLiveStreamOn = true;
      this.startLiveStream(uuidv4());
    }, 8000);
  }

  getPreviousTrends() {
    this.showLoader = this.isLiveStreamOn ? false : true;
    this._appService.getPreviousTrends().subscribe((response) => {
      this.prepareChartData(response["data"]);
      this.showLoader = false;
    });
  }

  startLiveStream(uniqueId) {
    this.showLoader = this.isLiveStreamOn ? false : true;
    let payload = {
      unique_id: uniqueId,
    };
    this._appService.getLiveStreamFeed(payload).subscribe((response) => {
      // Uncomment the below line to get the data from the mocks
      // let response = this._appService.getMockData();
      this.prepareChartData(response["data"]);
      this.previousResponse = response["data"];
      this.showLoader = false;
    });
  }

  prepareChartData(response) {
    if (this.isLiveStreamOn && this.previousResponse) {
      let prevAssets = this.previousResponse["asset_word"];
      for (let key in response["asset_word"]) {
        if (key in prevAssets) {
          response["asset_word"][key] = [
            response["asset_word"][key][0] + prevAssets[key][0],
          ];
        }
      }

      let prevWords = this.previousResponse["word_frequency"];
      for (let key in response["word_frequency"]) {
        if (key in prevWords) {
          response["word_frequency"][key] = [
            response["word_frequency"][key][0] + prevWords[key][0],
          ];
        }
      }
    }
    let dataObj = [];
    let dataLabel = [];
    let assetWordList = response["asset_word"];
    for (let key in assetWordList) {
      dataLabel.push(key);
      dataObj.push(assetWordList[key][0]);
    }
    this.barChartLabels = dataLabel;
    this.barChartData = [{ data: dataObj, label: "Top Assets" }];

    let dataObjWF = [];
    let dataLabelWF = [];
    let assetWordListWF = response["word_frequency"];
    for (let key in assetWordListWF) {
      dataLabelWF.push(key);
      dataObjWF.push(assetWordListWF[key][0]);
    }
    this.barChartLabelsWF = dataLabelWF;
    this.barChartDataWF = [{ data: dataObjWF, label: "Top 20 Words" }];

    this.tilesData = this.sortAndGetAssetClasses(response["asset_classes"]);
  }

  sortAndGetAssetClasses(acObj) {
    var sortable = [];
    for (var ac in acObj) {
      sortable.push([ac, acObj[ac]]);
    }
    sortable.sort(function (a, b) {
      return b[1] - a[1];
    });
    let aClasses = sortable.map((_) => {
      return _[0];
    });
    if (aClasses.length < 4) {
      let len = aClasses.length;
      for (let i = 0; i < 4 - len; i++) {
        aClasses.push("- NA -");
      }
    } else {
      aClasses = aClasses.slice(0, 4);
    }
    return aClasses;
  }
}
