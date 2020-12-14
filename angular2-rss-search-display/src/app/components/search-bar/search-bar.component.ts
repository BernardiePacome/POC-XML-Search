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

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('autocompleteInput') autoCompleteInput: ElementRef | undefined;

  @Input() matAutoComplete: any;
  @Output() selectedOption = new EventEmitter();

  feeds: FeedEntry[] | undefined;
  myFormControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  autoCompleteList: any[] | undefined;
  searchResults: FeedEntry[] = [];

  constructor(private fs: FeedService) {}

  ngOnInit(): void {
    this.myFormControl.valueChanges.subscribe((userInput) => {
      this.autoCompleteList = this.filterByTitle(userInput);
      console.log('subscribe', this.filterByTitle(userInput));
    });
    this.fs.getXMLFile().subscribe((res) => {
      this.feeds = this.fs.parseXMLFiletoFeed(res).items;
    });
  }

  filterByTitle(input: string): FeedEntry[] | undefined {
    if (input === '' || input === null) {
      return [];
    }

    console.log(
      this.feeds?.filter((s) => {
        return s.title.toLowerCase().indexOf(input.toLowerCase()) !== -1;
      })
    );

    return this.feeds?.filter(
      (s) => s.title.toLowerCase().indexOf(input.toLowerCase()) !== -1
    );
  }

  displayFunction(feedEntry: FeedEntry): string {
    return feedEntry ? feedEntry.title : feedEntry;
  }

  filterFeedsList(event: any): void {
    const query = event.source.value;
    if (!query) {
      this.fs.searchOption = [];
    } else {
      this.fs.searchOption.push(query);
      this.selectedOption.emit(this.fs.searchOption);
    }
    this.autoCompleteInput?.nativeElement.focus();
    // @ts-ignore
    this.autoCompleteInput?.nativeElement.value = '';
  }
}
