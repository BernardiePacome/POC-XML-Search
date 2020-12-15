import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Feed } from './model/feed';
import * as x2js from 'xml2js';
import { FeedEntry } from './model/feed-entry';
import { FeedBottomSheetComponent } from './components/feed-bottom-sheet/feed-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient, private bottomSheet: MatBottomSheet) {}

  public getXMLFile(): Observable<any> {
    return this.http.get(environment.api_url + '/xml');
  }

  public parseXMLFiletoFeed(file: any): Feed {
    const feed: Feed = {};
    const xml2json = new x2js.Parser();
    xml2json.parseString(file.feed, (err: any, result: any) => {
      feed.title = result.rss.channel[0].title[0];
      feed.publishDate = result.rss.channel[0].pubDate[0];
      feed.description = result.rss.channel[0].description[0];
      feed.link = result.rss.channel[0].link[0];

      const parsedFeedEntries: FeedEntry[] = [];

      result.rss.channel[0].item.forEach((item: any) => {
        parsedFeedEntries.push(
          new FeedEntry(
            item.title[0],
            item.pubDate[0],
            item.link[0],
            item.description[0],
            item['media:content'][0].$.url
          )
        );
        feed.items = parsedFeedEntries;
      });
    });

    return feed;
  }

  public openFeedSheet(feedEntry: FeedEntry): void {
    this.bottomSheet.open(FeedBottomSheetComponent, {
      data: { feed: feedEntry },
    });
  }
}
