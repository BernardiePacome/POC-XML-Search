import { Component, OnInit, Input } from '@angular/core';
import { FeedEntry } from '../../model/feed-entry';
import { FeedService } from '../../feed.service';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {
  @Input() items: FeedEntry[] | undefined;

  constructor(private fs: FeedService) {}

  ngOnInit(): void {}

  /**
   * Opens the bottom sheet for the selected feed entry.
   * @param feedEntry
   */
  openFeedSheet(feedEntry: FeedEntry): void {
    this.fs.openFeedSheet(feedEntry);
  }
}
