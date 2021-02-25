import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_CONFIG } from './app.config';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class AppService {
  constructor(private http: HttpClient) {
  }
  
  getAllData() {
    return this.http.get<any>(URL_CONFIG.BASE_URL + URL_CONFIG.GET_ALL_DATA);
  }

  getDataForRange(data) {
    return this.http.post<any>(
      URL_CONFIG.BASE_URL + URL_CONFIG.GET_DATA_FOR_RANGE,
      data,
      
    );
  }
}
