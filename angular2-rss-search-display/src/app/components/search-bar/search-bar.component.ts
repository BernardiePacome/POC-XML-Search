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
import { FeedService } from '../../feed.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('autocompleteInput') autoCompleteInput: ElementRef | undefined;
  @ViewChild(MatAutocompleteTrigger) autoCompleteTrigger:
    | MatAutocompleteTrigger
    | undefined;

  @Input() matAutoComplete: any;

  @Output() selectedFeedEntry = new EventEmitter<FeedEntry>();
  @Output() searchQueryList = new EventEmitter<FeedEntry[]>();
  @Output() setSearchResults = new EventEmitter<FeedEntry[]>();

  faTimes = faTimes;
  faSearch = faSearch;
  faNewspaper = faNewspaper;

  feeds: FeedEntry[] | undefined;
  myFormControl = new FormControl();
  autoCompleteList: any[] | undefined;
  searchResults: FeedEntry[] | undefined = [];
  autoCompleteSearchQueryText = '';
  searchQueryText = '';

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.myFormControl.valueChanges.subscribe((userInput) => {
      this.autoCompleteList = this.filterByTitle(userInput);
      this.autoCompleteSearchQueryText = userInput;
    });
    // API  calls to retrieve RSS feed.
    this.feedService.getXMLFile().subscribe((res) => {
      this.feeds = this.feedService.parseXMLFiletoFeed(res).items;
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
   * Filter feed entries by title and description for displaying the search results.
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
    this.autoCompleteTrigger?.closePanel();
  }

  /**
   * Opens the bottom sheet for the selected feed entry.
   * @param feedEntry Feed entry to display.
   */
  showSelectedFeedEntry(feedEntry: FeedEntry): void {
    this.feedService.openFeedSheet(feedEntry);
  }

  /**
   * Resets the search bar text input to empty.
   */
  resetForm(): void {
    this.autoCompleteTrigger?.closePanel();
    this.myFormControl.patchValue('');
    this.autoCompleteSearchQueryText = '';
  }
}
