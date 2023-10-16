import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beer } from '../beer.model';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent {
  @Input() beers?: Beer[];
  @Output() clickedBeer = new EventEmitter<Beer>();

  onBeerClick(beer: Beer) {
    this.clickedBeer.emit(beer);
  }

}
