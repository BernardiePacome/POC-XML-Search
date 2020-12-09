import { Component ,OnInit} from '@angular/core';
import { Feed } from './model/feed';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular2-rss-search-display';
  constructor(
    private fs : FeedService
  ){};
  ngOnInit(){

    this.rssFeed = this.fs.extractFeeds();
  }
  public rssFeed: any;
}
