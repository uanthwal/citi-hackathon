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
  showChart: boolean = false;
  showChartWF: boolean = false;
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

  constructor(private _route: ActivatedRoute, private _appService: AppService) {
    this._route.queryParamMap.subscribe((params) => {
      let paramObject = { ...params.keys, ...params };
      if (paramObject["params"]["load_type"] == "live") {
        this.uniqueId = uuidv4();
        this.startLiveStream();
      } else {
        this.uniqueId = "historical";
        this.getPreviousTrends();
      }
    });
  }

  ngOnInit(): void {}

  getPreviousTrends() {
    this._appService.getPreviousTrends().subscribe((response) => {
      this.prepareChartData(response);
    });
  }

  startLiveStream() {
    let payload = {
      unique_id: this.uniqueId,
    };

    this._appService.getLiveStreamFeed(payload).subscribe((response) => {
      this.prepareChartData(response);
    });
  }

  prepareChartData(response) {
    // let response = this.getDummyData();
    let dataObj = [];
    let dataLabel = [];
    let assetWordList = response["data"]["asset_word"];
    for (let key in assetWordList) {
      dataLabel.push(key);
      dataObj.push(assetWordList[key][0]);
    }
    this.barChartLabels = dataLabel;
    this.barChartData = [{ data: dataObj, label: "Top Assets" }];
    this.showChart = true;

    let dataObjWF = [];
    let dataLabelWF = [];
    let assetWordListWF = response["data"]["word_frequency"];
    for (let key in assetWordListWF) {
      dataLabelWF.push(key);
      dataObjWF.push(assetWordListWF[key][0]);
    }
    this.barChartLabelsWF = dataLabelWF;
    this.barChartDataWF = [{ data: dataObjWF, label: "Top 20 Words" }];
    this.showChartWF = true;
    this.tilesData = ["Equities1", "Equities11", "Equities12", "Equities13"];
  }

  getDummyData() {
    let res = {
      code: "200",
      data: {
        asset_word: {
          apartment: [1],
          art: [6],
          bitcoin: [2],
          brand: [3],
          credit: [2],
          ethereum: [2],
          gold: [1],
          home: [8],
          meat: [1],
          paintings: [1],
        },
        word_frequency: {
          chanyeol: [54],
          chanyeolseeyousoonchanyeol: [44],
          chanyeolwe: [45],
          de: [176],
          dont: [52],
          el: [49],
          en: [61],
          enhypen: [37],
          enhypenmembers: [32],
          exo: [52],
          im: [53],
          la: [71],
          love: [92],
          na: [39],
          people: [39],
          proud: [51],
          que: [92],
          un: [33],
          weareoneexo: [53],
          ya: [36],
        },
      },
    };
    return res;
  }
}
