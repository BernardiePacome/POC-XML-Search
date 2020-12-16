import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FeedEntry } from '../../model/feed-entry';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { FeedService } from '../../feed.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('autocompleteInput') autoCompleteInput: ElementRef | undefined;

  @Input() matAutoComplete: any;
  @Output() selectedFeedEntry = new EventEmitter<FeedEntry>();
  @Output() searchQueryList = new EventEmitter<FeedEntry[]>();
  @Output() setSearchResults = new EventEmitter<FeedEntry[]>();

  faTimes = faTimes;
  feeds: FeedEntry[] | undefined;
  myFormControl = new FormControl();
  autoCompleteList: any[] | undefined;
  searchResults: FeedEntry[] | undefined = [];
  autoCompleteSearchQueryText = '';
  searchQueryText = '';
  isSearchState = false;

  constructor(private fs: FeedService) {}

  ngOnInit(): void {
    this.myFormControl.valueChanges.subscribe((userInput) => {
      this.autoCompleteList = this.filterByTitle(userInput);
      this.autoCompleteSearchQueryText = userInput;
    });
    this.fs.getXMLFile().subscribe((res) => {
      this.feeds = this.fs.parseXMLFiletoFeed(res).items;
    });
  }

  /**
   * Simple filter by title for the Auto-complete list.
   * @param input search string.
   * @private
   */
  private filterByTitle(input: string): FeedEntry[] | undefined {
    if (input === '' || input === null) {
      return [];
    }

    return this.feeds?.filter(
      (s) => s.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
    );
  }

  /**
   * filter by title and description for displaying the search results.
   * @param event Keyboard Input event.
   */
  searchFeed(event: any): void {
    this.searchQueryText = event.target.value as string;
    if (this.searchQueryText === '') {
      this.setSearchResults.emit([]);
    } else {
      this.setSearchResults.emit(
        this.feeds?.filter(
          (search) =>
            search.title
              .toLowerCase()
              .indexOf(this.searchQueryText.toLowerCase()) !== -1 ||
            search.description
              .toLowerCase()
              .indexOf(this.searchQueryText.toLowerCase()) !== -1
        )
      );
    }
  }

  /**
   * Opens the bottom sheet for the selected feed entry.
   * @param feedEntry Feed entry to display.
   */
  showSelectedFeedEntry(feedEntry: FeedEntry): void {
    this.fs.openFeedSheet(feedEntry);
  }

  /**
   * resets the search bar text input to empty.
   */
  resetForm(): void {
    this.myFormControl.patchValue('');
    this.autoCompleteSearchQueryText = '';
    this.isSearchState = false;
  }
}
