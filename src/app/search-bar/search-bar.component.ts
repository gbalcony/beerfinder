import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() newSearchText = new EventEmitter<string>();
  searchText = "";

  onInput() {
    this.newSearchText.emit(this.searchText)
  }

}
