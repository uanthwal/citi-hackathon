import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URL_CONFIG } from "./app.config";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  getPreviousTrends() {
    return this.http.post<any>(
      URL_CONFIG.BASE_URL + URL_CONFIG.GET_PREV_TRENDS,
      {}
    );
  }

  getLiveStreamFeed(data) {
    return this.http.post<any>(
      URL_CONFIG.BASE_URL + URL_CONFIG.LIVE_STREAM_FEED,
      data
    );
  }

  getAssetClassMapping() {
    let mappongObject = {
      equities: [
        "shares",
        "market",
        "stock exchange",
        "risk tolerance",
        "investors returns",
        "asset allocation",
        "investment",
        "capital market",
        "portfolio",
        "market forecasts",
        "funds",
        "investors",
        "global market",
        "market value",
        "market equilibrium portfolio",
        "derivatives",
      ],
      "fixed income": [
        "cash flow",
        "bonds",
        "liabilities",
        "interest rate",
        "banks",
        "savings account",
        "government ",
        "bonds",
        "corporate bonds",
        "pension benifits",
        "retirement needs",
        "life insurance companies",
        "annuity payments",
        "return guarantees",
        "deposits",
        "fixed deposits",
        "municipal bonds",
        "certificate of deposit",
        "treasuries",
      ],
      "real estate": [
        "infra",
        "metro",
        "apartment",
        "investmet",
        "home",
        "rent",
        "retail",
        "warehouse",
        "office",
        "landlord",
        "loan",
        "property",
        "mortgage payments",
        "property tax",
        "living expenses",
      ],
      commodities: [
        "metals",
        "gold",
        "silver",
        "oil",
        "gas",
        "grains",
        "wheat",
        "rice",
        "millets",
        "agricultural products",
        "meat",
        "dairy",
        "e-commerce",
        "sea food",
      ],
      "hedge funds": [
        "long funds",
        "short funds",
        "global macro funds",
        "merger arbitrage",
        "high frequency trading",
        "market neutral",
        "convertible arbitrage",
        "event driven",
        "credit",
        "fixed income arbitrage",
        "global macro",
      ],
      "venture capital": [
        "private investments",
        "venture capital trusts",
        "spending commitments",
        "capital project commitments",
      ],
      collectives: [
        "patents",
        "classic wine",
        "vintage cars",
        "art",
        "paintings",
        "brand",
        "logo",
        "paintings",
        "historical treasure",
        "patent backed loans",
        "intellectual property",
      ],
      currency: [
        "foreign exchange",
        "us dollar",
        "singapore dollar",
        "canadian dollar",
        "chinese renminbi",
        "yen",
        "euro",
        "dirahms",
        "rupee",
      ],
      cryptocurrency: [
        "digital currency",
        "bitcoin",
        "crypto funds",
        "crypto market",
        "crypto assets",
        "ethereum",
        "ripple",
        "lite coin",
        "digital assets",
      ],
    };
    return mappongObject;
  }
}
