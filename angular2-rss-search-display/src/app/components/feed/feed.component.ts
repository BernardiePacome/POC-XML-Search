import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../feed.service';
import { Feed } from '../../model/feed';
import { FeedEntry } from '../../model/feed-entry';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private fs: FeedService) {}

  faExclamationCircle = faExclamationCircle;

  rssFeed: Feed = {};
  displayedSearchResults: FeedEntry[] | undefined;
  searching = false;
  hasResults = true;

  ngOnInit(): void {
    // API call to retrieve RSS feed.
    this.fs.getXMLFile().subscribe((res) => {
      this.rssFeed = this.fs.parseXMLFiletoFeed(res);
    });
  }

  /**
   * Sets the search results of the search bar and sets the states of the component.
   * @param feeds Array of feed entries to show as results.
   */
  setFeedSearchResults(feeds: FeedEntry[]): void {
    if (feeds.length === 0) {
      this.hasResults = false;
      this.searching = false;
    } else {
      this.hasResults = true;
      this.searching = true;
      this.displayedSearchResults = feeds;
    }
  }
}
