import { Component, OnInit } from '@angular/core';
import {FeedService} from '../../feed.service';
import {Feed} from '../../model/feed';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor(
    private fs: FeedService
  ) {

  }

  public rssFeed: Feed = {};

  ngOnInit(): void {
    this.fs.getXMLFile().subscribe((res) => {
      this.rssFeed = this.fs.parseXMLFiletoFeed(res);
      console.log(this.rssFeed);
    });

  }


}


