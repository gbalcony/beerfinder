import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Beer } from './beer.model';
import { BeerService } from './beer.service';
import { getTextValues, isSubstring } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'beerfinder';
  dataReady = false;
  beerMatches: Beer[] = [];

  private destroy$ = new Subject<void>();
  private beerToText = new Map<Beer, string[]>();

  
  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beerService.getBeers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(beers => {
        this.setBeerToText(beers);
        this.setDataReady();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onNewSearch(newSearchText: string) {
    if (!this.dataReady) return;

    this.setBeerMatches(newSearchText);
  }

  private setBeerToText(beers: Beer[]) {
    beers.forEach(beer => {
      const beerSearchableText = getTextValues(beer);
      this.beerToText.set(beer, beerSearchableText);
    });
  }

  private setDataReady() {
    this.dataReady = (this.beerToText.size > 0);
  }

  private setBeerMatches(textToFind: string) {
    this.clearBeerMatches();
    if (textToFind.length > 0) {
      this.addBeerMatches(textToFind);
    }
  }

  private clearBeerMatches() {
    while (this.beerMatches.length > 0) {
      this.beerMatches.pop();
    }
  }

  private addBeerMatches(textToFind: string) {
    const textToFindLowercase = textToFind.toLowerCase();

    this.beerToText.forEach((texts, beer) => {
      if (isSubstring(textToFind, texts)) {
        this.beerMatches.push(beer);
      }
    });
  }
}
