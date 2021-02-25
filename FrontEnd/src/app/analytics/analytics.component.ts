import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _appService: AppService) {
    this._route.queryParamMap.subscribe((params) => {
      let paramObject = { ...params.keys, ...params };
      if (
        paramObject['params']['startDate'] &&
        paramObject['params']['endDate']
      ) {
        this.getDataForDateRange(
          paramObject['params']['startDate'],
          paramObject['params']['endDate']
        );
      }
    });
  }

  ngOnInit(): void {}

  getDataForDateRange(startDate, endDate) {
    let payload = {
      startDate: startDate,
      endDate: endDate,
    };
    this._appService.getDataForRange(payload).subscribe((response) => {
      console.log(response);
    });
  }
}
