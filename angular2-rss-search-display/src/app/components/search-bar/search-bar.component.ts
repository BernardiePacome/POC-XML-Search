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

  faTimes = faTimes;
  feeds: FeedEntry[] | undefined;
  myFormControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  autoCompleteList: any[] | undefined;
  searchResults: FeedEntry[] = [];
  searchQueryText = '';

  constructor(private fs: FeedService) {}

  ngOnInit(): void {
    this.myFormControl.valueChanges.subscribe((userInput) => {
      this.autoCompleteList = this.filterByTitle(userInput);
      this.searchQueryText = userInput;
    });
    this.fs.getXMLFile().subscribe((res) => {
      this.feeds = this.fs.parseXMLFiletoFeed(res).items;
    });
  }

  filterByTitle(input: string): FeedEntry[] | undefined {
    if (input === '' || input === null) {
      return [];
    }

    return this.feeds?.filter(
      (s) => s.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
    );
  }

  selectFeedEntry(feedEntry: FeedEntry): void {
    this.selectedFeedEntry.emit(feedEntry);
    this.searchQueryList.emit(
      this.feeds?.filter(
        (s) =>
          s.title.toLowerCase().indexOf(this.searchQueryText.toLowerCase()) !==
          -1
      )
    );
  }

  resetForm(): void {
    this.myFormControl.patchValue('');
    this.searchQueryText = '';
  }
}
