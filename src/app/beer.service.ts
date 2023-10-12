import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beer } from './beer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  constructor(private http: HttpClient) { }

  public getBeers() {
    return this.http.get<Beer[]>("https://api.punkapi.com/v2/beers");
  }
}
