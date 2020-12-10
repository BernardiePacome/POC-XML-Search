import { Component, OnInit, Input } from '@angular/core';
import {FeedEntry} from '../../model/feed-entry';
import {Feed} from '../../model/feed';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {

  @Input() items: FeedEntry[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
