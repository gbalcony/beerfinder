import { Component, OnDestroy, OnInit } from '@angular/core';
import { BeerService } from './beer.service';
import { getTextValues, getValues, isSubstring } from './utils';
import { BehaviorSubject, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
import { Beer } from './beer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'beerfinder';
  dataReady = false;
  beerMatches: Beer[] = [];
  private beers: Beer[] = [];
  private beerSearchableTextIndex = new Map<Beer["id"], string[]>;
  private destroy$ = new Subject<void>();

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beerService.getBeers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(beers => {
        this.beers = beers;
        this.setBeerSearchableTextIndex(beers);
        this.dataReady = true;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNewSearch(searchText: string) {
    if (!this.dataReady) return;

    this.beerMatches = [];
    this.beerSearchableTextIndex.forEach((value, key) => {
      if (isSubstring(searchText, value)) {
        this.addBeerToBeerMatches(key);
      }
    });
  }

  private setBeerSearchableTextIndex(beers: Beer[]) {
    this.beerSearchableTextIndex.clear();
    beers.forEach(beer => this.beerSearchableTextIndex.set(beer.id, getTextValues(beer)));
  }

  private getBeer(id: number) {
    return this.beers.find(beer => beer.id === id) ?? null;
  }

  private addBeerToBeerMatches(beerId: number) {
    const beer = this.getBeer(beerId);

    if (beer) {
      this.beerMatches.push(beer);
    }
  }
}
