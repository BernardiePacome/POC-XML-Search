import { Component, OnInit, Input } from '@angular/core';
import { FeedEntry } from '../../model/feed-entry';
import { FeedService } from '../../feed.service';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper';
@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss'],
})
export class FeedCardComponent implements OnInit {
  @Input() items: FeedEntry[] | undefined;

  faNewspaper = faNewspaper;

  constructor(private feedService: FeedService) {}

  ngOnInit(): void {}

  /**
   * Opens the bottom sheet for the selected feed entry.
   * @param feedEntry The feed entry to display.
   */
  openFeedSheet(feedEntry: FeedEntry): void {
    this.feedService.openFeedSheet(feedEntry);
  }
}
