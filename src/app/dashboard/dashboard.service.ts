import { Injectable } from '@angular/core';
import { StoreService } from '../services/store/store.service';
import { ApiService } from '../services/api.service';
import { FootPrint } from '../services/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  footprint_url = '/footprints'

  constructor(private readonly _api_service: ApiService, private readonly _store_service: StoreService) {
    _api_service.get_simple("https://gist.githubusercontent.com/mbostock/4348373/raw/85f18ac90409caa5529b32156aa6e71cf985263f/flare.json")
      .subscribe(data => _store_service.sunbust_data = data)


  }

  get_footprints() {
    this._api_service.get<{ message: string, data: FootPrint[] }>(this.footprint_url)
      .subscribe(({ message, data }) => this._store_service.footprints = data)
  }

}
