import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../feed.service';
import { Feed } from '../../model/feed';
import { FeedEntry } from '../../model/feed-entry';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  constructor(private fs: FeedService) {}

  private partialItemsState = false;
  public rssFeed: Feed = {};
  public showFeedEntry: FeedEntry | undefined;

  ngOnInit(): void {
    this.fs.getXMLFile().subscribe((res) => {
      this.rssFeed = this.fs.parseXMLFiletoFeed(res);
    });
  }

  showFeed(feedEntry: FeedEntry): void {
    this.showFeedEntry = feedEntry;
  }

  displayPartialItems(feeds: FeedEntry[]): void {
    this.partialItemsState = true;
    this.rssFeed.items = feeds;
  }
}
